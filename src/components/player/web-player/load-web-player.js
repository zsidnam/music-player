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

const loadWebPlayer = async (cb) => {
    try {
        const existingScript = document.getElementById('web-player');
        if (existingScript) {
            console.warn('Attempted to load Spotify Web Player SDK multiple times');
            if (!window.Spotify?.Player) {
                throw new Error('Script was loaded but Spotify Player was not available.');
            }

            return cb(null, window.Spotify.Player);
        }

        const newScript = document.createElement('script');
        newScript.src = 'https://sdk.scdn.co/spotify-player.js';
        newScript.id = 'web-player';
        newScript.crossOrigin = true;
        document.body.appendChild(newScript);

        const { Player } = await _waitForSpotifyWebPlaybackSDKToLoad();
        return cb(null, Player);
    } catch (err) {
        return cb(err);
    }
};

export default loadWebPlayer;
