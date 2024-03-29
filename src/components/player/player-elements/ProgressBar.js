import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Slider, Typography } from '@material-ui/core';

import { formatTime } from '../../../utils/format';

const ProgressBar = ({ position, duration, onSeek, disabled }) => {
    const [localPosition, setLocalPosition] = useState(0);
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        if (!locked) {
            setLocalPosition(position / 1000);
        }

        // We don't want 'locked' to be a dependency as it can cause
        // the position to be briefly brought back to the current
        // player state (pre-update) before onSeek completes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

    const handleChangeStart = (_, value) => {
        setLocked(true);
        setLocalPosition(value);
    };

    const handleChangeCommit = (_, value) => {
        setLocked(false);
        onSeek(value * 1000);
    };

    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant={'caption'}>{formatTime(localPosition)}</Typography>

            <Box flex={1} mx={2}>
                <Slider
                    max={duration / 1000} // sec
                    value={localPosition} // sec
                    onChange={handleChangeStart}
                    onChangeCommitted={handleChangeCommit}
                    disabled={disabled}
                />
            </Box>

            <Typography variant={'caption'}>{formatTime(duration / 1000)}</Typography>
        </Box>
    );
};

ProgressBar.propTypes = {
    onSeek: PropTypes.func.isRequired,
    duration: PropTypes.number,
    position: PropTypes.number,
    disabled: PropTypes.bool,
};

export default memo(ProgressBar);
