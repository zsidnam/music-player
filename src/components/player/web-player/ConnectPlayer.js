import PropTypes from 'prop-types';
import { Component } from 'react';
import isEmpty from 'lodash.isempty';
import _get from 'lodash.get';

import PlayerInterface from '../player-elements/PlayerInterface';
import spotifyApi, {
    resumePlayback,
    pausePlayback,
    nextTrack,
    prevTrack,
    seek,
    changeVolume,
    setShuffleMode,
} from '../../../services/spotify-api';
import { PlayStateContext } from '../../../context/playStateContext';
import { getPlayerStateFromAPI } from '../../../utils/spotify-data';

// Amount of time player can be idle (player is paused or no device
// is connected) before device polling stops.
const IDLE_THRESHOLD = 30; // sec

// This needs to be set to 1000ms for normal use. During development,
// raise as needed to avoid hitting Spotify API too frequently.
const POLL_INTERVAL = 1000; // ms

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
            console.log('Player is not active, starting idle timer');
            this._setIdleTimeTracking();
        } else if (playerBackOnline || playerWasUnpaused) {
            console.log('Player is active again, stopping idle timer');
            this._removeIdleTimeTracking();
        }

        if (this.state.idleTime >= IDLE_THRESHOLD && this.playerStateInterval) {
            console.log(
                'Device polling stopped due to player inactivity. Use web player or reconnect to an active device'
            );
            this._removeActiveDevicePolling();
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
        this.playerStateInterval = setInterval(this.pollPlayerState, POLL_INTERVAL);
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
        this.setState({ idleTime: this.state.idleTime + 1 });
    }

    syncActiveDevice() {
        if (!!this.playerStateInterval) return;

        this.setState({ idleTime: 0 }, () => {
            this._setActiveDevicePolling();
        });
    }

    async pollPlayerState() {
        // TODO: move to graphQL
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
        this.state.playerState.paused ? resumePlayback() : pausePlayback();
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

    render() {
        // TODO: Add repeat function

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
                pollingPlayerState={!!this.playerStateInterval}
                syncActiveDevice={this.syncActiveDevice}
            />
        );
    }
}

ConnectPlayer.propTypes = {
    onPlayerStateUpdate: PropTypes.func.isRequired,
};

export default ConnectPlayer;
