import PropTypes from 'prop-types';
import { Typography, Grid, Box, Container, useTheme, makeStyles } from '@material-ui/core';

import SearchResultCategory from './SearchResultCategory';
import ColorizedContainer from '../common/ColorizedContainer';
import Thumbnail from '../common/Thumbnail';
import { useSearchContext } from '../../context/searchContext';
import SearchResultCategorySkeleton from './skeletons/SearchResultCategorySkeleton';

// Spotify returns images in order of widest -> smallest
const _getSmallestImgSrc = (images) => (images.length ? images[images.length - 1].url : null);

const useStyles = makeStyles(() => ({
    titleText: {
        fontSize: '4rem',
    },
}));

const SearchResults = ({ results, loading }) => {
    const theme = useTheme();
    const classes = useStyles();
    const { addRecentSearch } = useSearchContext();

    const handleThumbnailSelect = (thumbnailProps) => {
        addRecentSearch(thumbnailProps);
    };

    return (
        <Box mb={10}>
            <ColorizedContainer primaryColor={theme.palette.primary.main} maxWidth={'lg'}>
                <Box px={5} pb={5} pt={16}>
                    <Typography className={classes.titleText} variant={'h3'}>
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
                                            <Thumbnail
                                                href={`/albums/${track.album.id}`}
                                                imageSrc={_getSmallestImgSrc(track.album.images)}
                                                onSelect={handleThumbnailSelect}
                                                primaryText={track.name}
                                                secondaryText={track.artists
                                                    .map((artist) => artist.name)
                                                    .join(', ')}
                                            />
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
                                            <Thumbnail
                                                href={`/artists/${artist.id}`}
                                                imageSrc={_getSmallestImgSrc(artist.images)}
                                                onSelect={handleThumbnailSelect}
                                                primaryText={artist.name}
                                                circularFrame
                                            />
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
                                            <Thumbnail
                                                href={`/albums/${album.id}`}
                                                imageSrc={_getSmallestImgSrc(album.images)}
                                                onSelect={handleThumbnailSelect}
                                                primaryText={album.name}
                                                secondaryText={album.artists
                                                    .map((artist) => artist.name)
                                                    .join(', ')}
                                            />
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
