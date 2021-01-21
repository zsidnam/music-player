import React from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';

import VolumeSlider from './VolumeSlider';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import DevicesIcon from '@material-ui/icons/Devices';

const SecondaryControls = ({ volume, onVolumeChange }) => {
    // TODO: Consider memoizing this component
    return (
        <Grid container justify={'flex-end'} alignItems={'center'} spacing={1}>
            <Grid item>
                <IconButton color={'secondary'}>
                    <PlaylistPlayIcon fontSize={'small'} />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton color={'secondary'}>
                    <DevicesIcon fontSize={'small'} />
                </IconButton>
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
};

export default SecondaryControls;
