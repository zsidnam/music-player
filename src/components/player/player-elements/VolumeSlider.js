import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Slider, IconButton } from '@material-ui/core';
import debounce from 'lodash.debounce';

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

const VolumeSlider = ({ volume, onVolumeChange }) => {
    const [localVolume, setLocalVolume] = useState(0);

    useEffect(() => {
        setLocalVolume(volume);
    }, [volume]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedHandleVolumeChange = useCallback(
        debounce(onVolumeChange, 350),
        []
    );

    const handleChangeStart = (_, value) => {
        setLocalVolume(value);
        debouncedHandleVolumeChange(value);
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

VolumeSlider.propTypes = {
    volume: PropTypes.number,
    onVolumeChange: PropTypes.func.isRequired,
};

export default VolumeSlider;
