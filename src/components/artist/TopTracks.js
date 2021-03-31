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

    // TODO: Redirect/Display error message
    if (error) return <p>There was an error</p>;

    const { tracks } = data.topTracks;

    return (
        <Box>
            <Box mb={2}>
                <Typography variant={'overline'}>Top Tracks</Typography>
            </Box>

            {!tracks.length ? (
                <Box>
                    <Typography color={'textSecondary'}>
                        This artist does not have any top tracks.
                    </Typography>
                </Box>
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
        </Box>
    );
};

TopTracks.propTypes = {
    artistId: PropTypes.string.isRequired,
    artistUri: PropTypes.string.isRequired,
    primaryColor: PropTypes.string,
};

export default TopTracks;
