import axios from 'axios';

/*
    This Spotify API is mainly used to abstract POST & PUT requests. (No
    need for graphQL wrapper around axios calls when we don't care about
    the response data).
*/

const api = axios.create({
    baseURL: 'https://api.spotify.com',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export const resumePlayback = async () => {
    try {
        await api.put('/v1/me/player/play');
    } catch (err) {
        console.error(`Unable to resume playback. err=${err.message}`);
    }
};

export const pausePlayback = async () => {
    try {
        await api.put('/v1/me/player/pause');
    } catch (err) {
        console.error(`Unable to pause playback. err=${err.message}`);
    }
};

export const nextTrack = async () => {
    try {
        await api.post('/v1/me/player/next');
    } catch (err) {
        console.error(`Unable to go to next track. err=${err.message}`);
    }
};

export const prevTrack = async () => {
    try {
        await api.post('/v1/me/player/previous');
    } catch (err) {
        console.error(`Unable to go to previous track. err=${err.message}`);
    }
};

export const seek = async (positionMs) => {
    try {
        await api.put(`/v1/me/player/seek?position_ms=${positionMs}`);
    } catch (err) {
        console.error(`Unable to seek position on current track. err=${err.message}`);
    }
};

export const changeVolume = async (vol) => {
    try {
        await api.put(`/v1/me/player/volume?volume_percent=${vol}`);
    } catch (err) {
        console.error(`Unable to change volume. err=${err.message}`);
    }
};

export const playTracks = async (trackUris) => {
    try {
        await api.put('/v1/me/player/play', { uris: trackUris });
    } catch (err) {
        console.error(
            `Unable to play the following new trackUris: ${(trackUris || []).join(', ')}; err=${
                err.message
            }`
        );
    }
};

export const playContext = async (contextUri, trackNumber = undefined) => {
    try {
        await api.put('/v1/me/player/play', {
            context_uri: contextUri,
            // offset is zero indexed, so subtract 1 from track number
            offset: trackNumber ? { position: trackNumber - 1 } : undefined,
        });
    } catch (err) {
        console.error(`Unable to play the following contextUri: ${contextUri}; err=${err.message}`);
    }
};

export const setShuffleMode = async (shuffleEnabled) => {
    try {
        await api.put(`/v1/me/player/shuffle?state=${shuffleEnabled}`);
    } catch (err) {
        console.error(`Unable to set shuffle mode for current player; err=${err.message}`);
    }
};

export default api;
