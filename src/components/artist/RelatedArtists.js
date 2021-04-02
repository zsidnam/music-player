import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

import Thumbnail from '../common/Thumbnail';
import RelatedArtistsSkeleton from './skeletons/RelatedArtistsSkeleton';

const ARTISTS_TO_SHOW = 8;

const RELATED_ARTISTS_QUERY = gql`
    query GetRelatedArtists($artistId: ID!) {
        relatedArtists(artistId: $artistId) {
            artists {
                id
                uri
                name
                images {
                    width
                    height
                    url
                }
            }
        }
    }
`;

// Spotify returns images in order of widest -> smallest
const _getSmallestImgSrc = (images) => (images.length ? images[images.length - 1].url : null);

const RelatedArtists = ({ artistId }) => {
    const { loading, error, data } = useQuery(RELATED_ARTISTS_QUERY, { variables: { artistId } });

    if (loading) return <RelatedArtistsSkeleton />;

    if (error) {
        return (
            <>
                <Box mb={2}>
                    <Typography variant={'overline'}>Related Artists</Typography>
                </Box>
                <Typography color={'textSecondary'}>Unable to get related artists.</Typography>
            </>
        );
    }

    const { artists } = data.relatedArtists;

    return (
        <Box>
            <Box mb={2}>
                <Typography variant={'overline'}>Related Artists</Typography>
            </Box>

            {!artists.length ? (
                <Typography color={'textSecondary'}>
                    This artist does not have any related artists.
                </Typography>
            ) : (
                <Grid container direction={'column'} spacing={2}>
                    {artists.slice(0, ARTISTS_TO_SHOW).map((artist) => (
                        <Grid key={artist.id} item xs={12}>
                            <Thumbnail
                                href={`/artists/${artist.id}`}
                                imageSrc={_getSmallestImgSrc(artist.images)}
                                primaryText={artist.name}
                                circularFrame
                                imageSize={45}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

RelatedArtists.propTypes = {
    artistId: PropTypes.string.isRequired,
};

export default RelatedArtists;
