'use strict';

// See Web Playback SDK guide for more info on loading sequence
// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/

// TODO: Set max time to wait, handle error
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

const loadWebPlayer = async (cb) => {
    const existingScript = document.getElementById('web-player');

    if (existingScript) {
        console.warn('Attempted to load Spotify Web Player SDK multiple times');
        return cb && cb();
    }

    const newScript = document.createElement('script');
    newScript.crossOrigin = true;
    newScript.src = 'https://sdk.scdn.co/spotify-player.js';
    newScript.id = 'web-player';

    document.body.appendChild(newScript);
    await _waitForSpotifyWebPlaybackSDKToLoad();

    return cb();
};

export default loadWebPlayer;
