import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

import VolumeSlider from './VolumeSlider';
import DeviceMenu from './DeviceMenu';

const SecondaryControls = ({ volume, onVolumeChange, connectMode }) => {
    return (
        <Grid container justify={'flex-end'} alignItems={'center'} spacing={1}>
            <Grid item>
                <IconButton color={'secondary'}>
                    <PlaylistPlayIcon fontSize={'small'} />
                </IconButton>
            </Grid>
            <Grid item>
                <DeviceMenu connectMode={connectMode} />
            </Grid>
            <Grid item>
                <VolumeSlider volume={volume} onVolumeChange={onVolumeChange} />
            </Grid>
        </Grid>
    );
};

SecondaryControls.propTypes = {
    volume: PropTypes.number,
    onVolumeChange: PropTypes.func.isRequired,
    connectMode: PropTypes.bool,
};

export default memo(SecondaryControls);
