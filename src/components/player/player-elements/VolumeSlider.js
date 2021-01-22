import React, { useState, useEffect } from 'react';
import { Box, Grid, Slider, IconButton } from '@material-ui/core';

import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import DevicesIcon from '@material-ui/icons/Devices';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const _getVolumeIcon = (volume) => {
    if (volume === 0) {
        return <VolumeOffIcon fontSize={'small'} />;
    } else if (volume < 0.5) {
        return <VolumeDownIcon fontSize={'small'} />;
    }

    return <VolumeUpIcon fontSize={'small'} />;
};

// TODO: Consider avoiding player volume altogether and just using api
const VolumeSlider = ({ volume, onVolumeChange }) => {
    const [localVolume, setLocalVolume] = useState(0);

    useEffect(() => {
        setLocalVolume(volume);
    }, [volume]);

    const handleChangeStart = (_, value) => {
        // TODO: Debounce this
        setLocalVolume(value);
        onVolumeChange(value);
    };

    const handleIconClick = () => {
        const newVolume = localVolume > 0 ? 0 : 0.5;
        setLocalVolume(newVolume);
        onVolumeChange(newVolume);
    };

    return (
        <Box display={'flex'} alignItems={'flex-start'}>
            <IconButton color={'secondary'} onClick={handleIconClick}>
                {_getVolumeIcon(localVolume)}
            </IconButton>
            <Box width={100}>
                <Slider
                    max={1}
                    step={0.01}
                    value={localVolume}
                    onChange={handleChangeStart}
                />
            </Box>
        </Box>
    );
};

VolumeSlider.propTypes = {};

export default VolumeSlider;
