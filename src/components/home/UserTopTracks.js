import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

import TrackTable, { COLUMNS } from '../track/TrackTable';
import { playTracks } from '../../services/spotify-api';
import TopTracksSkeleton from '../track/skeletons/TopTracksSkeleton';

const USER_TOP_TRACKS_QUERY = gql`
    query GetUserTopTracks($limit: Int, $offset: Int) {
        userTopTracks(limit: $limit, offset: $offset) {
            items {
                id
                uri
                name
                explicit
                album {
                    id
                    uri
                    images {
                        width
                        height
                        url
                    }
                }
                artists {
                    id
                    uri
                    name
                }
            }
        }
    }
`;

const UserTopTracks = ({ primaryColor }) => {
    const { loading, error, data } = useQuery(USER_TOP_TRACKS_QUERY);

    if (loading) return <TopTracksSkeleton />;

    if (error) {
        return (
            <>
                <Box mb={2}>
                    <Typography variant={'overline'}>YourTop Tracks</Typography>
                </Box>
                <Typography color={'textSecondary'}>Unable to get your top tracks.</Typography>
            </>
        );
    }

    const { items: tracks } = data.userTopTracks;

    const handleTrackPlay = async (trackIndex) => {
        // Spotify does not allow you to provide an offset when playing a top-tracks context,
        // so unlike playing a specific song on an album or playlist, we need to explicitly
        // provide any other song uris we want to enter the play queue.
        const tracksToPlay = [...tracks.slice(trackIndex), ...tracks.slice(0, trackIndex)].map(
            (t) => t.uri
        );
        playTracks(tracksToPlay);
    };

    return (
        <>
            <Box mb={2}>
                <Typography variant={'overline'}>Your Top Tracks</Typography>
            </Box>

            {!tracks.length ? (
                <Typography color={'textSecondary'}>You do not have any top tracks.</Typography>
            ) : (
                <TrackTable
                    tracks={tracks}
                    primaryColor={primaryColor}
                    indexAsTrackNumber
                    disableTableHead
                    onTrackPlay={handleTrackPlay}
                    columns={[
                        COLUMNS.ALBUM_ART,
                        COLUMNS.TRACK_NUMBER,
                        COLUMNS.TITLE,
                        COLUMNS.ARTISTS,
                    ]}
                />
            )}
        </>
    );
};

UserTopTracks.propTypes = {
    primaryColor: PropTypes.string,
};

export default UserTopTracks;
