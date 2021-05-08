import React from 'react';
import isEmpty from 'lodash.isempty';
import _get from 'lodash.get';

import loadWebPlayer from './load-web-player';
import LoadingModal from './LoadingModal';
import PlayerInterface from '../player-elements/PlayerInterface';
import ConnectPlayer from './ConnectPlayer';
import { PlayStateContext } from '../../../context/playStateContext';
import { setShuffleMode, transferPlayback, setRepeatMode } from '../../../services/spotify-api';

// Note: Because of how the spotify player is implemented, the player functions
// cannot be passed directly by ref to children. A callback needs to be passed
// from this component and the player functions need to be called here. Due to that,
// it made more sense to write WebPlayer as a class component.

const PLAYER_NAME = 'Music Player App';
const DEFAULT_VOLUME_LEVEL = 0.5;

class WebPlayer extends React.Component {
    static contextType = PlayStateContext;

    constructor(props) {
        super(props);

        this.state = {
            deviceId: null,
            loaded: false,
            showLoadingModal: true,
            playerState: {},
            playerVolume: 0,
        };

        this.player = null;
        this.playerStateInterval = null;
        this.playerVolumeInterval = null;

        this.transferPlayback = this.transferPlayback.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleStateUpdate = this.handleStateUpdate.bind(this);
        this.initPlayer = this.initPlayer.bind(this);
        this.handlePlayToggle = this.handlePlayToggle.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleSeek = this.handleSeek.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.handleShuffleToggle = this.handleShuffleToggle.bind(this);
        this.handleRepeatToggle = this.handleRepeatToggle.bind(this);
        this.pollPlayerState = this.pollPlayerState.bind(this);
        this.pollPlayerVolume = this.pollPlayerVolume.bind(this);
        this._syncPlayerStateWithContext = this._syncPlayerStateWithContext.bind(this);
    }

    componentDidMount() {
        loadWebPlayer(this.initPlayer);
    }

    componentDidUpdate(_, prevState) {
        const playToggled = prevState.playerState.paused !== this.state.playerState.paused;
        const playerNowActive = isEmpty(prevState.playerState) && !isEmpty(this.state.playerState);
        const playerRemainsInactive = isEmpty(this.state.playerState);
        const playerNowInactive =
            !isEmpty(prevState.playerState) && isEmpty(this.state.playerState);

        if (playerNowInactive) {
            this._removeAllPolling();
        }

        if (playerRemainsInactive) return;

        this._syncPlayerStateWithContext(this.state.playerState);

        if (playerNowActive) {
            this._setActiveDevicePolling();
        }

        // While a song is playing, continue to update player state so playback position
        // is shown correctly. If paused, stop unnecessary polling.
        if (playToggled) {
            this._setPlayerQueryInterval();
        }
    }

    componentWillUnmount() {
        if (this.player) {
            this._removeAllPolling();
            this._removePlayerListeners();
            this.player.disconnect();
        }
    }

    async initPlayer(Player) {
        if (!Player) {
            console.error('Failed to load Spotify Web Player');
            this.setState({ showLoadingModal: false });
            return;
        }

        this.player = new Player({
            name: PLAYER_NAME,
            volume: DEFAULT_VOLUME_LEVEL,
            getOAuthToken: (cb) => {
                const token = localStorage.getItem('accessToken');
                cb(token);
            },
        });

        this._setPlayerListeners();
        await this.player.connect();
        this.setState({
            loaded: true,
            playerVolume: this.player._options.volume,
        });
    }

    _setPlayerListeners() {
        this.player.addListener('initialization_error', ({ message }) => {
            console.error(message);
        });

        this.player.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });

        this.player.addListener('account_error', ({ message }) => {
            console.error(message);
        });

        this.player.addListener('playback_error', ({ message }) => {
            // TODO: This will get hit if the access token is no longer
            // valid. If that is the case, we should log the user out
            // or attempt to refresh the token.
            console.error(message);
        });

        this.player.addListener('player_state_changed', (state) => {
            this.handleStateUpdate(state);
        });

        this.player.addListener('ready', ({ device_id }) => {
            this.setState({ showLoadingModal: false, deviceId: device_id }, () => {
                this.transferPlayback();
            });
        });

        this.player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
    }

    _removePlayerListeners() {
        this.player.removeListener('initialization_error');
        this.player.removeListener('authentication_error');
        this.player.removeListener('account_error');
        this.player.removeListener('playback_error');
        this.player.removeListener('player_state_changed');
        this.player.removeListener('ready');
        this.player.removeListener('not_ready');
    }

    // Set any intervals here that do not rely on player state
    // (eg volume can always be retrieved, but player state should only
    // be polled when a song is playing). These pollers should only
    // be used while web player device is active.
    _setActiveDevicePolling() {
        this.playerVolumeInterval = setInterval(this.pollPlayerVolume, 1000);
    }

    _setPlayerQueryInterval() {
        if (this.state.playerState.paused) {
            this.playerStateInterval && clearInterval(this.playerStateInterval);
        } else {
            this.playerStateInterval = setInterval(this.pollPlayerState, 1000);
        }
    }

    _removeAllPolling() {
        if (this.playerStateInterval) {
            clearInterval(this.playerStateInterval);
        }

        if (this.playerVolumeInterval) {
            clearInterval(this.playerVolumeInterval);
        }
    }

    _syncPlayerStateWithContext(currentPlayerState) {
        // Update play state context to include min set of
        // play info needed by components throughout app.
        // To avoid triggering needless re-renders in context
        // subscribers, only update if change occurred.
        const { setPlayState, playState: oldPlayState } = this.context;
        const contextUri = _get(currentPlayerState, 'context.uri');
        const paused = !!_get(currentPlayerState, 'paused');
        const playingUri = _get(currentPlayerState, 'track_window.current_track.uri');

        if (
            contextUri !== oldPlayState.contextUri ||
            playingUri !== oldPlayState.playingUri ||
            paused !== oldPlayState.paused
        ) {
            setPlayState({
                contextUri,
                playingUri,
                paused,
            });
        }
    }

    async pollPlayerState() {
        const newState = await this.player.getCurrentState();
        if (!newState) {
            return;
        }

        this.setState({
            playerState: newState,
        });
    }

    async pollPlayerVolume() {
        const newVolume = await this.player.getVolume();
        this.setState({ playerVolume: newVolume });
    }

    handleStateUpdate(newPlayerState) {
        this.setState({ playerState: newPlayerState || {} });
    }

    transferPlayback() {
        transferPlayback(this.state.deviceId);
    }

    closeModal() {
        this.setState({ showLoadingModal: false });
    }

    handlePlayToggle() {
        this.player.togglePlay();
    }

    handleNext() {
        this.player.nextTrack();
    }

    handlePrev() {
        const restartRequested = this.state.playerState.position > 3 * 1000;
        // When restarting a song, the player will not accept 0.0 as a valid
        // position to seek to, so we will use 0.01
        restartRequested ? this.handleSeek(0.01) : this.player.previousTrack();
    }

    handleSeek(ms) {
        this.player.seek(ms);
    }

    handleVolumeChange(vol) {
        const newVolume = parseFloat(vol);
        if (newVolume >= 0 && newVolume <= 1) {
            this.player.setVolume(newVolume);
        }
    }

    handleShuffleToggle() {
        // Spotify Web Playback SDK does not expose method to update shuffle mode.
        // Update via connect API.
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
            <>
                {!isEmpty(this.state.playerState) ? (
                    <PlayerInterface
                        disabled={!this.state.loaded}
                        playerState={this.state.playerState}
                        volume={this.state.playerVolume}
                        onPlayToggle={this.handlePlayToggle}
                        onNext={this.handleNext}
                        onPrev={this.handlePrev}
                        onSeek={this.handleSeek}
                        onVolumeChange={this.handleVolumeChange}
                        onShuffleToggle={this.handleShuffleToggle}
                        onRepeatToggle={this.handleRepeatToggle}
                    />
                ) : (
                    <ConnectPlayer onPlayerStateUpdate={this._syncPlayerStateWithContext} />
                )}

                <LoadingModal
                    open={this.state.showLoadingModal}
                    onClose={this.closeModal}
                    transferPlayback={this.transferPlayback}
                />
            </>
        );
    }
}

export default WebPlayer;
