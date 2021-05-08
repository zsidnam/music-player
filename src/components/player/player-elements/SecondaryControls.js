import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import VolumeSlider from './VolumeSlider';
import DeviceMenu from './DeviceMenu';

const SecondaryControls = ({
    volume,
    onVolumeChange,
    connectMode,
    disabled,
    pollingPlayerState,
    syncActiveDevice,
}) => {
    return (
        <Grid container justify={'flex-end'} alignItems={'center'} spacing={1}>
            <Grid item>
                <DeviceMenu
                    connectMode={connectMode}
                    pollingPlayerState={pollingPlayerState}
                    syncActiveDevice={syncActiveDevice}
                />
            </Grid>
            <Grid item>
                <VolumeSlider volume={volume} onVolumeChange={onVolumeChange} disabled={disabled} />
            </Grid>
        </Grid>
    );
};

SecondaryControls.propTypes = {
    volume: PropTypes.number,
    onVolumeChange: PropTypes.func.isRequired,
    connectMode: PropTypes.bool,
    disabled: PropTypes.bool,
    // The following props are optional and used
    // by the Connect Player only
    pollingPlayerState: PropTypes.bool,
    syncActiveDevice: PropTypes.func,
};

export default memo(SecondaryControls);
