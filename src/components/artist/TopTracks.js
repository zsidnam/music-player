import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

import TrackTable, { COLUMNS } from '../track/TrackTable';
import TopTracksSkeleton from './skeletons/TopTracksSkeleton';

const TOP_TRACKS_QUERY = gql`
    query GetTopTracks($artistId: ID!) {
        topTracks(artistId: $artistId) {
            tracks {
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
            }
        }
    }
`;

const TopTracks = ({ artistId, artistUri, primaryColor }) => {
    const { loading, error, data } = useQuery(TOP_TRACKS_QUERY, { variables: { artistId } });

    if (loading) return <TopTracksSkeleton />;

    if (error) {
        return (
            <>
                <Box mb={2}>
                    <Typography variant={'overline'}>Top Tracks</Typography>
                </Box>
                <Typography color={'textSecondary'}>
                    Unable to get top tracks for artist.
                </Typography>
            </>
        );
    }

    const { tracks } = data.topTracks;

    return (
        <>
            <Box mb={2}>
                <Typography variant={'overline'}>Top Tracks</Typography>
            </Box>

            {!tracks.length ? (
                <Typography color={'textSecondary'}>
                    This artist does not have any top tracks.
                </Typography>
            ) : (
                <TrackTable
                    contextUri={artistUri}
                    tracks={tracks}
                    primaryColor={primaryColor}
                    indexAsTrackNumber
                    disableTableHead
                    columns={[COLUMNS.ALBUM_ART, COLUMNS.TRACK_NUMBER, COLUMNS.TITLE]}
                />
            )}
        </>
    );
};

TopTracks.propTypes = {
    artistId: PropTypes.string.isRequired,
    artistUri: PropTypes.string.isRequired,
    primaryColor: PropTypes.string,
};

export default TopTracks;
