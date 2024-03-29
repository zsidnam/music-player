import { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import NextIcon from '@material-ui/icons/SkipNext';
import PrevIcon from '@material-ui/icons/SkipPrevious';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';

import { RepeatMode } from '../../../utils/spotify-data';

const PrimaryControls = ({
    paused,
    shuffle,
    repeat_mode,
    onPlayToggle,
    onShuffleToggle,
    onRepeatToggle,
    onNext,
    onPrev,
    disabled,
}) => {
    return (
        <Grid container justify={'center'} alignItems={'center'} spacing={1}>
            <Grid item>
                <IconButton
                    color={shuffle ? 'primary' : 'secondary'}
                    onClick={onShuffleToggle}
                    disabled={disabled}
                >
                    <ShuffleIcon fontSize={'small'} />
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton color={'secondary'} onClick={onPrev} disabled={disabled}>
                    <PrevIcon fontSize={'large'} />
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton color={'secondary'} onClick={onPlayToggle} disabled={disabled}>
                    {paused ? <PlayIcon fontSize={'large'} /> : <PauseIcon fontSize={'large'} />}
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton color={'secondary'} onClick={onNext} disabled={disabled}>
                    <NextIcon fontSize={'large'} />
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton
                    onClick={onRepeatToggle}
                    color={repeat_mode === RepeatMode.OFF ? 'secondary' : 'primary'}
                    disabled={disabled}
                >
                    {repeat_mode === RepeatMode.TRACK ? (
                        <RepeatOneIcon fontSize={'small'} />
                    ) : (
                        <RepeatIcon fontSize={'small'} />
                    )}
                </IconButton>
            </Grid>
        </Grid>
    );
};

PrimaryControls.propTypes = {
    onPlayToggle: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onShuffleToggle: PropTypes.func.isRequired,
    onRepeatToggle: PropTypes.func.isRequired,
    paused: PropTypes.bool,
    shuffle: PropTypes.bool,
    repeat_mode: PropTypes.number,
    disabled: PropTypes.bool,
};

export default memo(PrimaryControls);
