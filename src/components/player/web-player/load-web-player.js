'use strict';

// See Web Playback SDK guide for more info on loading sequence
// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/

const _waitForSpotifyWebPlaybackSDKToLoad = () => {
    return new Promise((resolve) => {
        if (window.Spotify) {
            resolve(window.Spotify);
        } else {
            window.onSpotifyWebPlaybackSDKReady = () => {
                resolve(window.Spotify);
            };
        }
    });
};

const _handleScriptLoad = async (token, cb) => {
    const { Player } = await _waitForSpotifyWebPlaybackSDKToLoad();
    const player = new Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (tcb) => {
            tcb(token);
        },
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });
    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });
    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });
    player.addListener('playback_error', ({ message }) => {
        console.error(message);
    });

    // Playback status updates
    player.addListener('player_state_changed', (state) => {
        console.log(state);
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    const connected = await player.connect();
    if (connected) {
        return cb(player);
    }

    return cb(null);
};

const loadWebPlayer = (token, cb) => {
    const existingScript = document.getElementById('web-player');

    if (existingScript) {
        console.warn('Attempted to load Spotify Web Player SDK multiple times');
        return cb && cb();
    }

    const newScript = document.createElement('script');
    newScript.src = 'https://sdk.scdn.co/spotify-player.js';
    newScript.id = 'web-player';

    document.body.appendChild(newScript);
    _handleScriptLoad(token, cb);
};

export default loadWebPlayer;
