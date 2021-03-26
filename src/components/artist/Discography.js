import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

import AlbumGroup from '../album/AlbumGroup';

const ALBUM_PAGE_SIZE = 20;

const ARTIST_ALBUMS_QUERY = gql`
    query GetArtistAlbums($artistId: ID!, $limit: Int, $offset: Int) {
        artistAlbums(artistId: $artistId, limit: $limit, offset: $offset) {
            next
            items {
                id
                uri
                name
                images {
                    width
                    height
                    url
                }
                release_date
                release_date_precision
                album_group
                album_type
            }
        }
    }
`;

// Albums are returned in date desc order, so we will keep the first
// (most recent version of a duplicate album)
const _deDupeAlbums = (albums) => {
    const uniqAlbums = [];
    const uniqAlbumNames = {};
    albums.forEach((album) => {
        if (!uniqAlbumNames[album.name]) {
            uniqAlbums.push(album);
            uniqAlbumNames[album.name] = true;
        }
    });

    return uniqAlbums;
};

const Discography = ({ artistId }) => {
    const { loading, error, data, fetchMore } = useQuery(ARTIST_ALBUMS_QUERY, {
        variables: { artistId, limit: ALBUM_PAGE_SIZE, offset: 0 },
    });

    // TODO: Add skeleton
    if (loading) return <p>Loading...</p>;

    // TODO: Redirect/Display error message
    if (error) return <p>There was an error</p>;

    const { items, next } = data.artistAlbums;

    const handleLoadMore = () => {
        return fetchMore({
            variables: { offset: items.length },
        });
    };

    // Spotify has a pretty bad problem with duplicate albums for this query.
    // There are complications with dealing with the dupes in the cache since
    // the number of albums will no longer match up with offset/limit values
    // when dupes are removed. For now, deal with the dupes on render and revisit
    // if this becomes a performance issue.
    const deDupedAlbums = _deDupeAlbums(items);

    const albums = deDupedAlbums.filter((album) => album.album_group === 'album');
    const singles = deDupedAlbums.filter((album) => album.album_group === 'single');

    return (
        <Box>
            {albums.length > 0 && (
                <Box mb={5}>
                    <AlbumGroup
                        albums={albums}
                        title={'Albums'}
                        onLoadMore={handleLoadMore}
                        hasMoreAlbums={!!next}
                    />
                </Box>
            )}

            {singles.length > 0 && (
                <AlbumGroup
                    albums={singles}
                    title={'Singles & EPs'}
                    onLoadMore={handleLoadMore}
                    hasMoreAlbums={!!next}
                />
            )}
        </Box>
    );
};

Discography.propTypes = {
    artistId: PropTypes.string.isRequired,
};

export default Discography;
