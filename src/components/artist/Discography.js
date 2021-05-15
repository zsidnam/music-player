import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import AlbumGroup from '../album/AlbumGroup';
import DiscographySkeleton from './skeletons/DiscographySkeleton';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { SCROLLABLE_CONTENT_CONTAINER_ID } from '../../utils/constants';
import { ARTIST_ALBUMS_QUERY } from '../../graphql/queries/artist';

const ALBUM_PAGE_SIZE = 20;

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

    const handleLoadMore = () => {
        return fetchMore({
            variables: { offset: items.length },
        });
    };

    useInfiniteScroll(handleLoadMore, !!data?.artistAlbums?.next, SCROLLABLE_CONTENT_CONTAINER_ID);

    if (loading) return <DiscographySkeleton />;

    if (error) {
        return (
            <>
                <Box mb={2}>
                    <Typography variant={'overline'}>Albums</Typography>
                </Box>
                <Typography color={'textSecondary'}>Unable to get albums for artist.</Typography>
            </>
        );
    }

    // Spotify has a pretty bad problem with duplicate albums for this query.
    // There are complications with dealing with the dupes in the cache since
    // the number of albums will no longer match up with offset/limit values
    // when dupes are removed. For now, deal with the dupes on render and revisit
    // if this becomes a performance issue.
    const { items } = data.artistAlbums;
    const deDupedAlbums = _deDupeAlbums(items);
    const albums = deDupedAlbums.filter((album) => album.album_group === 'album');
    const singles = deDupedAlbums.filter((album) => album.album_group === 'single');

    return (
        <>
            {albums.length > 0 && (
                <Box mb={5}>
                    <AlbumGroup albums={albums} title={'Albums'} />
                </Box>
            )}

            {singles.length > 0 && <AlbumGroup albums={singles} title={'Singles & EPs'} />}
        </>
    );
};

Discography.propTypes = {
    artistId: PropTypes.string.isRequired,
};

export default Discography;
