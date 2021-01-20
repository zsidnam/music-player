import {
    Grid,
    IconButton,
    Slider,
    makeStyles,
    Typography,
} from '@material-ui/core';
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

const useStyles = makeStyles(() => ({
    stretch: {
        flex: 1,
    },
}));

const PrimaryControls = ({ playbackControls, playerState }) => {
    const classes = useStyles();

    const { togglePlay, seek, prev, next } = playbackControls;
    const { duration, position, paused, shuffle, repeat_mode } = playerState;

    return (
        <Grid container direction={'column'}>
            <Grid
                item
                xs={12}
                container
                justify={'center'}
                alignItems={'center'}
                spacing={1}
            >
                <Grid item>
                    <IconButton color={shuffle ? 'primary' : 'secondary'}>
                        <ShuffleIcon fontSize={'small'} />
                    </IconButton>
                </Grid>

                <Grid item>
                    <IconButton color={'secondary'} onClick={prev}>
                        <PrevIcon fontSize={'large'} />
                    </IconButton>
                </Grid>

                <Grid item>
                    <IconButton color={'secondary'} onClick={togglePlay}>
                        {paused ? (
                            <PlayIcon fontSize={'large'} />
                        ) : (
                            <PauseIcon fontSize={'large'} />
                        )}
                    </IconButton>
                </Grid>

                <Grid item>
                    <IconButton color={'secondary'} onClick={next}>
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
            <Grid
                item
                xs={12}
                container
                alignItems={'center'}
                justify={'space-between'}
                spacing={3}
            >
                <Grid item>
                    <Typography variant={'caption'}>T1</Typography>
                </Grid>

                <Grid item className={classes.stretch}>
                    <Slider />
                </Grid>

                <Grid item>
                    <Typography variant={'caption'}>T2</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

PrimaryControls.propTypes = {};

export default PrimaryControls;
