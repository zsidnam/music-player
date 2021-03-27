import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';

import AlbumCover from './AlbumCover';

const AlbumGroup = ({ albums, title }) => {
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
