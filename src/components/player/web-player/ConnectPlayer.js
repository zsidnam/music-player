import { Component } from 'react';

import PlayerInterface from '../player-elements/PlayerInterface';
import spotifyApi from '../../../services/spotify-api';

// Clean up console errors; move api calls to helper library?

class ConnectPlayer extends Component {
    constructor(props) {
        super(props);

        this.handlePlayToggle = this.handlePlayToggle.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
    }

    componentDidMount() {
        console.log('mounted up!');
    }

    componentDidUpdate() {
        // something
    }

    componentWillUnmount() {
        console.log('un-mounting!');
    }

    async handlePlayToggle() {
        // not as simple as toggle, need to know playing state
        console.log('coming soon');
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

    async handleVolumeChange(vol) {
        // volume must be integer between 0 - 100, not 0 - 1 like web player
        const adjustedVol = vol;

        try {
            await spotifyApi.put('/v1/me/player/volume', {
                volume_percent: adjustedVol,
            });
        } catch (err) {
            console.error('Unable to change volume');
        }
    }

    render() {
        return (
            <PlayerInterface
                connectMode
                playerState={{}}
                volume={null}
                onPlayToggle={this.handlePlayToggle}
                onNext={this.handleNext}
                onPrev={this.handlePrev}
                onSeek={null}
                onVolumeChange={this.handleVolumeChange}
            />
        );
    }
}

export default ConnectPlayer;
