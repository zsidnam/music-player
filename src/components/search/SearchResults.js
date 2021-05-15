import PropTypes from 'prop-types';
import { Typography, Grid, Box, Container, useTheme } from '@material-ui/core';
import { motion } from 'framer-motion';

import SearchResultCategory from './SearchResultCategory';
import ColorizedContainer from '../common/ColorizedContainer';
import Thumbnail from '../common/Thumbnail';
import { useSearchContext } from '../../context/searchContext';
import { usePrefetch } from '../../hooks/usePrefetch';
import SearchResultCategorySkeleton from './skeletons/SearchResultCategorySkeleton';
import {
    ARTIST_QUERY,
    RELATED_ARTISTS_QUERY,
    TOP_TRACKS_QUERY,
} from '../../graphql/queries/artist';
import { ALBUM_QUERY, ALBUM_TRACKS_QUERY } from '../../graphql/queries/album';

// Spotify returns images in order of widest -> smallest
const _getSmallestImgSrc = (images) => (images.length ? images[images.length - 1].url : null);

const SearchResults = ({ results, loading }) => {
    const theme = useTheme();
    const { addRecentSearch } = useSearchContext();
    const prefetch = usePrefetch();

    const handleThumbnailSelect = (thumbnailProps) => {
        addRecentSearch(thumbnailProps);
    };

    const handleArtistMouseEnter = (artistId) => {
        prefetch([
            {
                query: ARTIST_QUERY,
                variables: { id: artistId },
            },
            {
                query: RELATED_ARTISTS_QUERY,
                variables: { artistId },
            },
            {
                query: TOP_TRACKS_QUERY,
                variables: { artistId },
            },
        ]);
    };

    const handleTrackAndAlbumMouseEnter = (albumId) => {
        prefetch([
            {
                query: ALBUM_QUERY,
                variables: { id: albumId },
            },
            {
                query: ALBUM_TRACKS_QUERY,
                variables: {
                    albumId,
                    limit: 15,
                    offset: 0,
                },
            },
        ]);
    };

    return (
        <Box mb={10}>
            <ColorizedContainer primaryColor={theme.palette.primary.main} maxWidth={'lg'}>
                <Box px={5} pb={5} pt={16}>
                    <Typography style={{ fontSize: '4rem' }} variant={'h3'}>
                        Search Results
                    </Typography>
                </Box>
            </ColorizedContainer>

            <Container maxWidth={'lg'}>
                <Box mx={5} pt={5}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} sm={4}>
                            {loading ? (
                                <SearchResultCategorySkeleton hasSecondaryText />
                            ) : (
                                <SearchResultCategory
                                    title={'Songs'}
                                    items={results.tracks.items}
                                    renderResult={(track) => (
                                        <Grid key={track.id} item xs={12}>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                onMouseEnter={() =>
                                                    handleTrackAndAlbumMouseEnter(track.album.id)
                                                }
                                            >
                                                <Thumbnail
                                                    href={`/albums/${track.album.id}`}
                                                    imageSrc={_getSmallestImgSrc(
                                                        track.album.images
                                                    )}
                                                    onSelect={handleThumbnailSelect}
                                                    primaryText={track.name}
                                                    secondaryText={track.artists
                                                        .map((artist) => artist.name)
                                                        .join(', ')}
                                                />
                                            </motion.div>
                                        </Grid>
                                    )}
                                />
                            )}
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            {loading ? (
                                <SearchResultCategorySkeleton circularFrame />
                            ) : (
                                <SearchResultCategory
                                    title={'Artists'}
                                    items={results.artists.items}
                                    renderResult={(artist) => (
                                        <Grid key={artist.id} item xs={12}>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                onMouseEnter={() =>
                                                    handleArtistMouseEnter(artist.id)
                                                }
                                            >
                                                <Thumbnail
                                                    href={`/artists/${artist.id}`}
                                                    imageSrc={_getSmallestImgSrc(artist.images)}
                                                    onSelect={handleThumbnailSelect}
                                                    primaryText={artist.name}
                                                    circularFrame
                                                />
                                            </motion.div>
                                        </Grid>
                                    )}
                                />
                            )}
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            {loading ? (
                                <SearchResultCategorySkeleton hasSecondaryText />
                            ) : (
                                <SearchResultCategory
                                    title={'Albums'}
                                    items={results.albums.items}
                                    renderResult={(album) => (
                                        <Grid key={album.id} item xs={12}>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                layoutId={`album-${album.id}`}
                                                onMouseEnter={() =>
                                                    handleTrackAndAlbumMouseEnter(album.id)
                                                }
                                            >
                                                <Thumbnail
                                                    href={`/albums/${album.id}`}
                                                    imageSrc={_getSmallestImgSrc(album.images)}
                                                    onSelect={handleThumbnailSelect}
                                                    primaryText={album.name}
                                                    secondaryText={album.artists
                                                        .map((artist) => artist.name)
                                                        .join(', ')}
                                                />
                                            </motion.div>
                                        </Grid>
                                    )}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

SearchResults.propTypes = {
    loading: PropTypes.bool,
    results: PropTypes.shape({
        albums: PropTypes.shape({
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    uri: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                })
            ).isRequired,
        }).isRequired,
        artists: PropTypes.shape({
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    uri: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                })
            ).isRequired,
        }).isRequired,
        tracks: PropTypes.shape({
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    uri: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                })
            ).isRequired,
        }).isRequired,
    }),
};

export default SearchResults;
