import PropTypes from 'prop-types';
import { Component } from 'react';
import isEmpty from 'lodash.isempty';
import _get from 'lodash.get';
import { withSnackbar } from 'notistack';

import PlayerInterface from '../player-elements/PlayerInterface';
import spotifyApi, {
    resumePlayback,
    pausePlayback,
    nextTrack,
    prevTrack,
    seek,
    changeVolume,
    setShuffleMode,
    setRepeatMode,
} from '../../../services/spotify-api';
import { PlayStateContext } from '../../../context/playStateContext';
import { getPlayerStateFromAPI } from '../../../utils/spotify-data';

// Amount of time player can be idle (player is paused or no device
// is connected) before device polling stops.
const IDLE_THRESHOLD_SEC = 10;

// This needs to be set to 1s for normal use. During development,
// raise as needed to avoid hitting Spotify API too frequently.
const POLL_INTERVAL_SEC = 1;

// TODO: Add optimistic updates for player controls

class ConnectPlayer extends Component {
    static contextType = PlayStateContext;

    constructor(props) {
        super(props);

        this.state = {
            playerState: {},
            idleTime: 0,
        };

        this.playerStateInterval = null;
        this.idleInterval = null;

        this.handlePlayToggle = this.handlePlayToggle.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleSeek = this.handleSeek.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.handleShuffleToggle = this.handleShuffleToggle.bind(this);
        this.handleRepeatToggle = this.handleRepeatToggle.bind(this);
        this.pollPlayerState = this.pollPlayerState.bind(this);
        this.trackIdleTime = this.trackIdleTime.bind(this);
        this.syncActiveDevice = this.syncActiveDevice.bind(this);
    }

    componentDidMount() {
        this._setIdleTimeTracking();
        this._setActiveDevicePolling();
    }

    componentDidUpdate(_, prevState) {
        const playStateChanged = prevState.playerState !== this.state.playerState;
        const playerWasUnpaused = !this.state.playerState.paused && prevState.playerState.paused;
        const playerWasPaused = this.state.playerState.paused && !prevState.playerState.paused;
        const playerBackOnline = !isEmpty(this.state.playerState) && isEmpty(prevState.playerState);
        const playerWentOffline =
            isEmpty(this.state.playerState) && !isEmpty(prevState.playerState);

        if (playStateChanged) {
            this.props.onPlayerStateUpdate(this.state.playerState);
        }

        // The following blocks are in place to avoid racking up unnecessary
        // api calls if player is not in use.
        if (playerWentOffline || playerWasPaused) {
            this._setIdleTimeTracking();
        } else if (playerBackOnline || playerWasUnpaused) {
            this._removeIdleTimeTracking();
        }

        if (this.state.idleTime >= IDLE_THRESHOLD_SEC && this.playerStateInterval) {
            this.props.enqueueSnackbar(
                'Device polling stopped due to player inactivity. Please use the web player or reconnect to an active device.'
            );
            this._removeActiveDevicePolling();
            this._removeIdleTimeTracking();
        }
    }

    componentWillUnmount() {
        this._removeAllPolling();
    }

    _setIdleTimeTracking() {
        this.idleInterval = setInterval(this.trackIdleTime, 1000);
    }

    _removeIdleTimeTracking() {
        this.idleInterval && clearInterval(this.idleInterval);
        this.idleInterval = null;
        this.setState({ idleTime: 0 });
    }

    _setActiveDevicePolling() {
        this.playerStateInterval = setInterval(this.pollPlayerState, POLL_INTERVAL_SEC * 1000);
    }

    _removeActiveDevicePolling() {
        this.playerStateInterval && clearInterval(this.playerStateInterval);
        this.playerStateInterval = null;
    }

    _removeAllPolling() {
        this._removeActiveDevicePolling();
        this._removeIdleTimeTracking();
    }

    trackIdleTime() {
        // Prevent state update if component has unmounted by time this gets called
        if (!this.idleInterval) return;

        this.setState({ idleTime: this.state.idleTime + 1 });
    }

    syncActiveDevice() {
        if (!!this.playerStateInterval) return;

        this.setState({ idleTime: 0 }, () => {
            this._setActiveDevicePolling();
        });
    }

    async pollPlayerState() {
        // Prevent state update if component has unmounted by time this gets called
        if (!this.playerStateInterval) return;

        const { data: newState } = await spotifyApi.get('/v1/me/player');

        // If player has just gone offline, set playerState to empty object.
        // After that, we don't need to keep updating if state is still empty
        if (!newState && !isEmpty(this.state.playerState)) {
            this.setState({ playerState: {} });
            return;
        }

        this.setState({ playerState: getPlayerStateFromAPI(newState) });
    }

    handlePlayToggle() {
        if (this.state.playerState.paused && !this.playerStateInterval) {
            // Start device polling back up if it was turned off due to inactivity
            this._setActiveDevicePolling();

            resumePlayback();
        } else {
            pausePlayback();
        }
    }

    handleNext() {
        nextTrack();
    }

    handlePrev() {
        const restartRequested = this.state.playerState.position > 3 * 1000;
        restartRequested ? this.handleSeek(0) : prevTrack();
    }

    handleSeek(ms) {
        seek(ms);
    }

    handleVolumeChange(vol) {
        // volume must be integer between 0 - 100, not 0 - 1 like web player
        const adjustedVol = parseInt(vol * 100, 10);
        changeVolume(adjustedVol);
    }

    handleShuffleToggle() {
        setShuffleMode(!this.state.playerState.shuffle);
    }

    handleRepeatToggle() {
        // Spotify Web Playback SDK does not expose method to update repeat mode.
        // Update via connect API.
        const nextRepeatMode = ((this.state.playerState.repeat_mode || 0) + 1) % 3;
        setRepeatMode(nextRepeatMode);
    }

    render() {
        return (
            <PlayerInterface
                disabled={isEmpty(this.state.playerState)}
                connectMode={!isEmpty(this.state.playerState)}
                playerState={this.state.playerState}
                volume={this.state.playerState.volume || 0}
                onPlayToggle={this.handlePlayToggle}
                onNext={this.handleNext}
                onPrev={this.handlePrev}
                onSeek={this.handleSeek}
                onVolumeChange={this.handleVolumeChange}
                onShuffleToggle={this.handleShuffleToggle}
                onRepeatToggle={this.handleRepeatToggle}
                pollingPlayerState={!!this.playerStateInterval}
                syncActiveDevice={this.syncActiveDevice}
            />
        );
    }
}

ConnectPlayer.propTypes = {
    onPlayerStateUpdate: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    closeSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(ConnectPlayer);
