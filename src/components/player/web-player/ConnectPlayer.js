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

// This needs to be set to 1000ms for normal use. During development,
// raise as needed to avoid hitting Spotify API too frequently.
//const POLL_INTERVAL = 1000;
const POLL_INTERVAL = 1000;

// TODO: Add optimistic updates for player controls

class ConnectPlayer extends Component {
    // TODO: Fix this eslint issue
    static contextType = PlayStateContext;

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
        this.handleShuffleToggle = this.handleShuffleToggle.bind(this);
        this.pollPlayerState = this.pollPlayerState.bind(this);
    }

    componentDidMount() {
        this._setActiveDevicePolling();
    }

    componentDidUpdate(_, prevState) {
        if (prevState.playerState !== this.state.playerState) {
            this.props.onPlayerStateUpdate(this.state.playerState);
        }
    }

    componentWillUnmount() {
        this._removeAllPolling();
    }

    _setActiveDevicePolling() {
        this.playerStateInterval = setInterval(this.pollPlayerState, POLL_INTERVAL);
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

    handlePlayToggle() {
        this.state.playerState.paused ? resumePlayback() : pausePlayback();
    }

    handleNext() {
        nextTrack();
    }

    handlePrev() {
        // Reset track position if requested after 3 sec of playback
        this.state.playerState.position > 3 * 1000 ? this.handleSeek(0) : prevTrack();
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
        // TODO: Turn connectMode off if not playing anything

        // TODO: Add repeat function

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
                onShuffleToggle={this.handleShuffleToggle}
            />
        );
    }
}

export default ConnectPlayer;
