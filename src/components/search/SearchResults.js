import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';

import SearchResultCategory from './SearchResultCategory';
import Thumbnail from '../common/Thumbnail';

// Spotify returns images in order of widest -> smallest
const _getSmallestImgSrc = (images) => (images.length ? images[images.length - 1].url : null);

const SearchResults = ({ results }) => {
    return (
        <Box mx={5}>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                    <SearchResultCategory
                        title={'Songs'}
                        items={results.tracks.items}
                        renderResult={(track) => (
                            <Grid key={track.id} item xs={12}>
                                <Thumbnail
                                    href={`/albums/${track.album.id}`}
                                    imageSrc={_getSmallestImgSrc(track.album.images)}
                                    primaryText={track.name}
                                    secondaryText={track.artists
                                        .map((artist) => artist.name)
                                        .join(', ')}
                                />
                            </Grid>
                        )}
                    />
                </Grid>

                <Grid item xs={6} sm={4}>
                    <SearchResultCategory
                        title={'Artists'}
                        items={results.artists.items}
                        renderResult={(artist) => (
                            <Grid key={artist.id} item xs={12}>
                                <Thumbnail
                                    href={`/artists/${artist.id}`}
                                    imageSrc={_getSmallestImgSrc(artist.images)}
                                    primaryText={artist.name}
                                    circularFrame
                                />
                            </Grid>
                        )}
                    />
                </Grid>

                <Grid item xs={6} sm={4}>
                    <SearchResultCategory
                        title={'Albums'}
                        items={results.albums.items}
                        renderResult={(album) => (
                            <Grid key={album.id} item xs={12}>
                                <Thumbnail
                                    href={`/albums/${album.id}`}
                                    imageSrc={_getSmallestImgSrc(album.images)}
                                    primaryText={album.name}
                                    secondaryText={album.artists
                                        .map((artist) => artist.name)
                                        .join(', ')}
                                />
                            </Grid>
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

SearchResults.propTypes = {
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
    }).isRequired,
};

export default SearchResults;
