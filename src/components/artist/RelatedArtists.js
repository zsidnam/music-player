import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

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

const RelatedArtists = () => {
    return (
        <Box>
            <Box mb={2}>
                <Typography variant={'overline'}>Related Artists</Typography>
            </Box>
        </Box>
    );
};

RelatedArtists.propTypes = {};

export default RelatedArtists;
