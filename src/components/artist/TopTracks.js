import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

import TrackTable, { COLUMNS } from '../track/TrackTable';

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
    // TODO: Update error handling
    const { loading, error, data } = useQuery(TOP_TRACKS_QUERY, { variables: { artistId } });

    // TODO: Add skeleton
    if (loading) return <p>Loading...</p>;

    // TODO: Redirect/Display error message
    if (error) return <p>There was an error</p>;

    const { tracks } = data.topTracks;

    return (
        <Box>
            <Box mb={2}>
                <Typography variant={'overline'}>Top Tracks</Typography>
            </Box>

            <TrackTable
                contextUri={artistUri}
                tracks={tracks}
                primaryColor={primaryColor}
                indexAsTrackNumber
                disableTableHead
                columns={[COLUMNS.ALBUM_ART, COLUMNS.TRACK_NUMBER, COLUMNS.TITLE]}
            />
        </Box>
    );
};

TopTracks.propTypes = {
    artistId: PropTypes.string.isRequired,
    artistUri: PropTypes.string.isRequired,
    primaryColor: PropTypes.string,
};

export default TopTracks;
