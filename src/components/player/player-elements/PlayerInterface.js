import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

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
    return (
        <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item xs={4} lg={3} xl={2}>
                <PlayingInfo playerState={playerState} />
            </Grid>
            <Grid item xs={4} lg={6} xl={8}>
                <Grid container direction={'column'}>
                    <Grid item>
                        <PrimaryControls
                            playerState={playerState}
                            onPlayToggle={onPlayToggle}
                            onNext={onNext}
                            onPrev={onPrev}
                        />
                    </Grid>
                    <Grid item>
                        <ProgressBar
                            playerState={playerState}
                            onSeek={onSeek}
                        />
                    </Grid>
                </Grid>
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
    playerState: PropTypes.object,
    volume: PropTypes.number,
    onPlayToggle: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onSeek: PropTypes.func.isRequired,
    onVolumeChange: PropTypes.func.isRequired,
};

export default PlayerInterface;
