import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';

import AlbumCover from './AlbumCover';
import { usePrefetch } from '../../hooks/usePrefetch';
import { ALBUM_QUERY, ALBUM_TRACKS_QUERY } from '../../graphql/queries/album';

const AlbumGroup = ({ albums, title }) => {
    const prefetch = usePrefetch();
    const handleMouseEnter = useCallback(
        (albumId) => {
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
        },
        [prefetch]
    );

    return (
        <Box>
            <Box mb={2}>
                <Typography variant={'overline'}>{title}</Typography>
            </Box>

            <Grid container spacing={3}>
                {albums.map((album) => (
                    <Grid key={album.id} item xs={3} lg={2}>
                        <AlbumCover album={album} onMouseEnter={handleMouseEnter} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

AlbumGroup.propTypes = {
    title: PropTypes.string.isRequired,
    albums: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            album_group: PropTypes.string.isRequired,
            album_type: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default AlbumGroup;
