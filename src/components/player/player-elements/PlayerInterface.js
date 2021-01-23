import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import _get from 'lodash.get';

import PlayingInfo from './PlayingInfo';
import PrimaryControls from './PrimaryControls';
import ProgressBar from './ProgressBar';
import SecondaryControls from './SecondaryControls';

const PlayerInterface = ({
    playerState,
    volume,
    onPlayToggle,
    onNext,
    onPrev,
    onSeek,
    onVolumeChange,
}) => {
    const currentTrack = _get(playerState, 'track_window.current_track');
    const { paused, shuffle, repeat_mode, position, duration } = playerState;

    return (
        <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item xs={4} lg={3} xl={2}>
                <PlayingInfo currentTrack={currentTrack} />
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
                    />
                    <ProgressBar
                        position={position}
                        duration={duration}
                        onSeek={onSeek}
                    />
                </Box>
            </Grid>
            <Grid item xs={4} lg={3} xl={2}>
                <SecondaryControls
                    volume={volume}
                    onVolumeChange={onVolumeChange}
                />
            </Grid>
        </Grid>
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
};

export default PlayerInterface;
