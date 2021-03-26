import PropTypes from 'prop-types';
import { Box, Grid, Typography, IconButton, makeStyles } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

import AlbumCover from './AlbumCover';
import LoadMoreButton from '../common/LoadMoreButton';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.common.lightGrey,
        fontSize: '3rem',
    },
    button: {
        '&:hover': {
            backgroundColor: theme.palette.common.darkGrey,
        },
    },
    loadContainer: {
        padding: theme.spacing(2),
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

const AlbumGroup = ({ albums, title, onLoadMore, hasMoreAlbums }) => {
    const classes = useStyles();

    return (
        <Box>
            <Box mb={2}>
                <Typography variant={'overline'}>{title}</Typography>
            </Box>

            <Grid container spacing={3}>
                {albums.map((album) => (
                    <Grid key={album.id} item xs={3} lg={2}>
                        <AlbumCover album={album} />
                    </Grid>
                ))}

                {hasMoreAlbums && (
                    <Grid item>
                        <Box className={classes.loadContainer}>
                            <LoadMoreButton onLoadMore={onLoadMore} />
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

AlbumGroup.propTypes = {
    title: PropTypes.string.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    hasMoreAlbums: PropTypes.bool,
    albums: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            album_group: PropTypes.string.isRequired,
            album_type: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default AlbumGroup;
