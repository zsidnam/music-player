import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import NextIcon from '@material-ui/icons/SkipNext';
import PrevIcon from '@material-ui/icons/SkipPrevious';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';

const RepeatSetting = {
    NO_REPEAT: 0,
    ONCE_REPEAT: 1,
    FULL_REPEAT: 2,
};

const PrimaryControls = ({ playerState, onPlayToggle, onNext, onPrev }) => {
    const { paused, shuffle, repeat_mode } = playerState;

    return (
        <Grid container justify={'center'} alignItems={'center'} spacing={1}>
            <Grid item>
                <IconButton color={shuffle ? 'primary' : 'secondary'}>
                    <ShuffleIcon fontSize={'small'} />
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton color={'secondary'} onClick={onPrev}>
                    <PrevIcon fontSize={'large'} />
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton color={'secondary'} onClick={onPlayToggle}>
                    {paused ? (
                        <PlayIcon fontSize={'large'} />
                    ) : (
                        <PauseIcon fontSize={'large'} />
                    )}
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton color={'secondary'} onClick={onNext}>
                    <NextIcon fontSize={'large'} />
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton
                    color={
                        repeat_mode === RepeatSetting.NO_REPEAT
                            ? 'secondary'
                            : 'primary'
                    }
                >
                    {repeat_mode === RepeatSetting.ONCE_REPEAT ? (
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
    playerState: PropTypes.shape({
        paused: PropTypes.bool,
        shuffle: PropTypes.bool,
        repeat_mode: PropTypes.number,
    }),
};

export default PrimaryControls;
