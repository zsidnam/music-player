'use strict';

// TODO: Get rid of web-api-node and use axios directly

import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';

const SHOW_DIALOG = true;
const SCOPES = [
    'app-remote-control',
    'playlist-read-private',
    'streaming',
    'user-modify-playback-state',
    'user-library-read',
    'user-top-read',
    'user-read-currently-playing',
    'user-read-email',
    'user-read-playback-position',
    'user-read-playback-state',
    'user-read-private',
    'user-read-recently-played',
];

export const SPOTIFY_STATE_KEY = 'SPOTIFY_STATE_KEY';
export const SPOTIFY_REFRESH_TOKEN_KEY = 'SPOTIFY_ACCESS_TOKEN_KEY';

const _spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export const getAuthURL = (stateString = null) => {
    const authURL = _spotifyApi.createAuthorizeURL(SCOPES, stateString, SHOW_DIALOG);

    return authURL;
};

export const getTokens = (authCode) => {
    return _spotifyApi.authorizationCodeGrant(authCode);
};

export const refreshAccessToken = async (refreshToken) => {
    try {
        // Get Base64 encoded auth string
        const rawString = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
        const encodedString = Buffer.from(rawString).toString('base64');

        const { data } = await axios.post(
            'https://accounts.spotify.com/api/token',
            {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            },
            {
                headers: {
                    Authorization: `Basic ${encodedString}`,
                },
            }
        );

        console.log('Here is the refresh token data');
        console.log(data);

        return data.access_token;
    } catch (err) {
        console.error(`Unable to refresh access token. err=${err.message}`);
        throw err;
    }
};
