/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, Typography } from '@material-ui/core';

const TrackContextMenu = forwardRef((props, ref) => {
    return (
        <Box ref={ref}>
            <MenuItem>
                <Typography>Add to Queue</Typography>
            </MenuItem>
            <MenuItem>
                <Typography>Go to Artist</Typography>
            </MenuItem>
            <MenuItem>
                <Typography>Go to Album</Typography>
            </MenuItem>
        </Box>
    );
});

TrackContextMenu.propTypes = {};

export default TrackContextMenu;
