import PropTypes from 'prop-types';
import { Grid, Box, Typography, makeStyles } from '@material-ui/core';
import _get from 'lodash.get';

import PlayingInfo from './PlayingInfo';
import PrimaryControls from './PrimaryControls';
import ProgressBar from './ProgressBar';
import SecondaryControls from './SecondaryControls';

const useStyles = makeStyles((theme) => ({
    playerContainer: {
        height: 100,
        backgroundColor: theme.palette.common.nearBlack,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `0 ${theme.spacing(4)}`,
    },
    connectBar: {
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
    },
    connectText: {
        padding: `${theme.spacing(0.25)} 0`,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
}));

const PlayerInterface = ({
    playerState,
    volume,
    onPlayToggle,
    onNext,
    onPrev,
    onSeek,
    onVolumeChange,
    onShuffleToggle,
    connectMode,
}) => {
    const classes = useStyles();
    const currentTrack = _get(playerState, 'track_window.current_track');
    const { paused, shuffle, repeat_mode, position, duration } = playerState;

    return (
        <>
            <Box className={classes.playerContainer}>
                <Grid container justify={'space-between'} alignItems={'center'}>
                    <Grid item xs={4} lg={3} xl={2}>
                        <PlayingInfo currentTrack={currentTrack} uri={_get(currentTrack, 'uri')} />
                    </Grid>
                    <Grid item xs={4} lg={6} xl={8}>
                        <Box display={'flex'} flexDirection={'column'}>
                            <PrimaryControls
                                paused={paused}
                                shuffle={shuffle}
                                repeat_mode={repeat_mode}
                                onPlayToggle={onPlayToggle}
                                onNext={onNext}
                                onPrev={onPrev}
                                onShuffleToggle={onShuffleToggle}
                            />
                            <ProgressBar position={position} duration={duration} onSeek={onSeek} />
                        </Box>
                    </Grid>
                    <Grid item xs={4} lg={3} xl={2}>
                        <SecondaryControls
                            volume={volume}
                            onVolumeChange={onVolumeChange}
                            connectMode={connectMode}
                        />
                    </Grid>
                </Grid>
            </Box>

            {connectMode && (
                <Box className={classes.connectBar}>
                    <Typography variant={'caption'} className={classes.connectText}>
                        Listening through Spotify Connect
                    </Typography>
                </Box>
            )}
        </>
    );
};

PlayerInterface.propTypes = {
    playerState: PropTypes.shape({
        paused: PropTypes.bool,
        shuffle: PropTypes.bool,
        repeat_mode: PropTypes.number,
        duration: PropTypes.number,
        position: PropTypes.number,
        track_window: PropTypes.shape({
            current_track: PropTypes.object,
        }),
    }),
    volume: PropTypes.number,
    onPlayToggle: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onSeek: PropTypes.func.isRequired,
    onVolumeChange: PropTypes.func.isRequired,
    onShuffleToggle: PropTypes.func.isRequired,
    connectMode: PropTypes.bool,
};

export default PlayerInterface;
