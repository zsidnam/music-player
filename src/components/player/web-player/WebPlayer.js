import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import isEmpty from 'lodash.isempty';

import spotifyApi from '../../../services/spotify-api';
import loadWebPlayer from './load-web-player';
import PlayingInfo from '../player-elements/PlayingInfo';
import PrimaryControls from '../player-elements/PrimaryControls';
import SecondaryControls from '../player-elements/SecondaryControls';
import PlaybackTransferModal from './PlaybackTransferModal';
import ProgressBar from '../player-elements/ProgressBar';

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
        // If player is no longer in use, playerState will get set to null
        if (isEmpty(this.state.playerState)) return;

        // While a song is playing, continue to update player state so playback position
        // is shown correctly.
        if (prevState.playerState.paused !== this.state.playerState.paused) {
            this._setPlayerQueryInterval();
        }
    }

    componentWillUnmount() {
        if (this.player) {
            this._clearAllIntervals();
            this._removePlayerListeners();
            this.player.disconnect();
        }
    }

    _setPlayerQueryInterval() {
        if (this.state.playerState.paused) {
            this.playerStateInterval && clearInterval(this.playerStateInterval);
        } else {
            this.playerStateInterval = setInterval(this.pollPlayerState, 1000);
        }
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
    // be polled when a song is playing).
    _setPermanentIntervals() {
        this.playerVolumeInterval = setInterval(null, 1000);
    }

    _clearAllIntervals() {
        if (this.playerStateInterval) {
            clearInterval(this.playerStateInterval);
        }

        if (this.playerVolumeInterval) {
            clearInterval(this.playerVolumeInterval);
        }
    }

    async initPlayer(Player) {
        if (!Player) {
            console.error('Failed to load Spotify Web Player');
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

        this._setPermanentIntervals();
        this.setState({
            loaded: true,
            playerVolume: this.player._options.volume,
        });
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
        // If playerState gets set to null, that means that the player is no
        // longer in use. (Ex: user switches playback to another device).
        // Stop polling player state and set it to empty object.
        if (!newPlayerState) {
            this._clearAllIntervals();
            this.setState({ playerState: {} });
            return;
        }

        this.setState({ playerState: newPlayerState });
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
        if (!this.state.loaded || !this.player) {
            return <Box>Loading...</Box>;
        }

        return (
            <>
                <Grid container justify={'space-between'} alignItems={'center'}>
                    <Grid item xs={4} lg={3} xl={2}>
                        <PlayingInfo playerState={this.state.playerState} />
                    </Grid>
                    <Grid item xs={4} lg={6} xl={8}>
                        <Grid container direction={'column'}>
                            <Grid item>
                                <PrimaryControls
                                    playerState={this.state.playerState}
                                    onPlayToggle={this.handlePlayToggle}
                                    onNext={this.handleNext}
                                    onPrev={this.handlePrev}
                                />
                            </Grid>
                            <Grid item>
                                <ProgressBar
                                    playerState={this.state.playerState}
                                    onSeek={this.handleSeek}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} lg={3} xl={2}>
                        <SecondaryControls
                            volume={this.state.playerVolume}
                            onVolumeChange={this.handleVolumeChange}
                        />
                    </Grid>
                </Grid>

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
