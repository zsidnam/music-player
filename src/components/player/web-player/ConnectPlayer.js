import { Component } from 'react';
import isEmpty from 'lodash.isempty';

import PlayerInterface from '../player-elements/PlayerInterface';
import spotifyApi from '../../../services/spotify-api';
import { getPlayerStateFromAPI } from '../../../utils/spotify-data';

// This needs to be set to 1000ms for normal use. During development,
// raise as needed to avoid hitting Spotify API too frequently.
//const POLL_INTERVAL = 1000;
const POLL_INTERVAL = 1000 * 10;

// TODO: Clean up console errors; move api calls to helper library?

// TODO: Add optimistic updates for player controls

class ConnectPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerState: {
                volume: 0,
            },
        };

        this.playerStateInterval = null;

        this.handlePlayToggle = this.handlePlayToggle.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleSeek = this.handleSeek.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.pollPlayerState = this.pollPlayerState.bind(this);
    }

    componentDidMount() {
        this._setActiveDevicePolling();
    }

    componentWillUnmount() {
        this._removeAllPolling();
    }

    _setActiveDevicePolling() {
        this.playerStateInterval = setInterval(
            this.pollPlayerState,
            POLL_INTERVAL
        );
    }

    _removeAllPolling() {
        if (this.playerStateInterval) {
            clearInterval(this.playerStateInterval);
        }
    }

    async pollPlayerState() {
        const { data: newState } = await spotifyApi.get('/v1/me/player');

        // If player has just gone offline, set playerState to empty object.
        // After that, we don't need to keep updating if state is still empty
        if (!newState && !isEmpty(this.state.playerState)) {
            this.setState({ playerState: {} });
            return;
        }

        this.setState({ playerState: getPlayerStateFromAPI(newState) });
    }

    async handlePlayToggle() {
        try {
            this.state.playerState.paused ? this._play() : this._pause();
        } catch (err) {
            console.error('Unable to toggle play state');
        }
    }

    _pause() {
        return spotifyApi.put('/v1/me/player/pause');
    }

    _play() {
        return spotifyApi.put('/v1/me/player/play');
    }

    async handleNext() {
        try {
            await spotifyApi.post('/v1/me/player/next');
        } catch (err) {
            console.error('Unable to go to next track');
        }
    }

    async handlePrev() {
        try {
            await spotifyApi.post('/v1/me/player/previous');
        } catch (err) {
            console.error('Unable to go to prev track');
        }
    }

    async handleSeek(ms) {
        try {
            await spotifyApi.put('/v1/me/player/seek', {
                position_ms: ms,
            });
        } catch (err) {
            console.error('Unable to seek position on current track');
        }
    }

    async handleVolumeChange(vol) {
        // volume must be integer between 0 - 100, not 0 - 1 like web player
        const adjustedVol = parseInt(vol * 100, 10);

        try {
            await spotifyApi.put(
                `/v1/me/player/volume?volume_percent=${adjustedVol}`
            );
        } catch (err) {
            console.error('Unable to change volume');
        }
    }

    render() {
        // TODO: Turn connectMode off if not playing anything

        // TODO: Add shuffle and repeat functions

        // TODO: Fix volume and seek operations
        return (
            <PlayerInterface
                connectMode
                playerState={this.state.playerState}
                volume={this.state.playerState.volume}
                onPlayToggle={this.handlePlayToggle}
                onNext={this.handleNext}
                onPrev={this.handlePrev}
                onSeek={this.handleSeek}
                onVolumeChange={this.handleVolumeChange}
            />
        );
    }
}

export default ConnectPlayer;
