import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import isEmpty from 'lodash.isempty';

import spotifyApi from '../../../services/spotify-api';
import loadWebPlayer from './load-web-player';
import PlaybackTransferModal from './PlaybackTransferModal';
import PlayerInterface from '../player-elements/PlayerInterface';
import ConnectPlayer from './ConnectPlayer';

// Note: Because of how the spotify player is implemented, the player functions
// cannot be passed directly by ref to children. A callback needs to be passed
// from this component and the player functions need to be called here. Due to that,
// it made more sense to write WebPlayer as a class component.

class WebPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            showPlaybackModal: false,
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
        this.pollPlayerState = this.pollPlayerState.bind(this);
        this.pollPlayerVolume = this.pollPlayerVolume.bind(this);
    }

    componentDidMount() {
        loadWebPlayer(this.initPlayer);
    }

    componentDidUpdate(_, prevState) {
        // WebPlayer is no longer active device
        if (
            !isEmpty(prevState.playerState) &&
            isEmpty(this.state.playerState)
        ) {
            this._removeAllPolling();
        }

        // No updated needed if WebPlayer remains inactive
        if (isEmpty(this.state.playerState)) return;

        // WebPlayer is now active device
        if (
            isEmpty(prevState.playerState) &&
            !isEmpty(this.state.playerState)
        ) {
            this._setActiveDevicePolling();
        }

        // While a song is playing, continue to update player state so playback position
        // is shown correctly. If paused, stop unnecessary polling.
        if (prevState.playerState.paused !== this.state.playerState.paused) {
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
            return;
        }

        this.player = new Player({
            name: 'Music Player App',
            volume: 0.75,
            getOAuthToken: (cb) => {
                cb(this.props.token);
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
            console.error(message);
        });

        this.player.addListener('player_state_changed', (state) => {
            this.handleStateUpdate(state);
        });

        this.player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            this.setState({ showPlaybackModal: true });
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
        // TODO: Research whether polling volume is necessary. Leave out for now.
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

    async pollPlayerState() {
        const newState = await this.player.getCurrentState();
        if (!newState) {
            console.error(
                'Cannot query player state when Web Playback SDK is not in use.'
            );
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
        // Return empty object instead of null if player becomes inactive
        this.setState({ playerState: newPlayerState || {} });
    }

    transferPlayback() {
        spotifyApi.put('/v1/me/player', {
            device_ids: [this.player._options.id],
            play: true,
        });
    }

    closeModal() {
        this.setState({ showPlaybackModal: false });
    }

    handlePlayToggle() {
        this.player.togglePlay();
    }

    handleNext() {
        this.player.nextTrack();
    }

    handlePrev() {
        this.player.previousTrack();
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

    render() {
        if (!this.state.loaded) {
            return <Box>Loading...</Box>;
        }

        return (
            <>
                {!isEmpty(this.state.playerState) ? (
                    <PlayerInterface
                        playerState={this.state.playerState}
                        volume={this.state.playerVolume}
                        onPlayToggle={this.handlePlayToggle}
                        onNext={this.handleNext}
                        onPrev={this.handlePrev}
                        onSeek={this.handleSeek}
                        onVolumeChange={this.handleVolumeChange}
                    />
                ) : (
                    <ConnectPlayer />
                )}

                <PlaybackTransferModal
                    open={this.state.showPlaybackModal}
                    onClose={this.closeModal}
                    transferPlayback={this.transferPlayback}
                />
            </>
        );
    }
}

WebPlayer.propTypes = {
    token: PropTypes.string.isRequired,
};

export default WebPlayer;
