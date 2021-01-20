import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';

import spotifyApi from '../../../services/spotify-api';
import loadWebPlayer from './load-web-player';
import PlayingInfo from '../player-elements/PlayingInfo';
import PrimaryControls from '../player-elements/PrimaryControls';
import SecondaryControls from '../player-elements/SecondaryControls';
import PlaybackTransferModal from './PlaybackTransferModal';

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
        };

        this.player = null;
        this.transferPlayback = this.transferPlayback.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleStateUpdate = this.handleStateUpdate.bind(this);
        this.initPlayer = this.initPlayer.bind(this);
        this.handlePlayToggle = this.handlePlayToggle.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleSeek = this.handleSeek.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
    }

    componentDidMount() {
        loadWebPlayer(this.initPlayer);
    }

    componentWillUnmount() {
        if (this.player) {
            console.log('Disconnecting web player.');
            this._removePlayerListeners();
            this.player.disconnect();
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

    initPlayer() {
        if (!window.Spotify) {
            console.error('Failed to load Spotify Web Player');
        }

        this.player = new window.Spotify.Player({
            name: 'Music Player App',
            getOAuthToken: (cb) => {
                cb(this.props.token);
            },
        });

        this._setPlayerListeners();

        this.player.connect().then(() => {
            console.log('Connected to Spotify!');
            this.setState({
                loaded: true,
            });
        });
    }

    handleStateUpdate(newPlayerState) {
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
                        <PlayingInfo
                            currentTrack={
                                this.state.playerState.track_window &&
                                this.state.playerState.track_window
                                    .current_track
                            }
                        />
                    </Grid>
                    <Grid item xs={4} lg={6} xl={8}>
                        <PrimaryControls
                            playerState={this.state.playerState}
                            onPlayToggle={this.handlePlayToggle}
                            onNext={this.handleNext}
                            onPrev={this.handlePrev}
                            onSeek={this.handleSeek}
                        />
                    </Grid>
                    <Grid item xs={4} lg={3} xl={2}>
                        <SecondaryControls
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
