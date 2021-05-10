'use strict';

/*  
    This module contains code to connect to Spotify.
    This can be run on the server only.
*/

import axios from 'axios';
import querystring from 'querystring';

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

export const getAuthURL = (stateString = null) => {
    return `https://accounts.spotify.com/authorize?response_type=code&client_id=${
        process.env.SPOTIFY_CLIENT_ID
    }&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&state=${stateString}&scope=${SCOPES.join(
        ' '
    )}`;
};

export const getTokens = async (authCode) => {
    const { data: tokens } = await axios.post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        })
    );

    return tokens;
};

export const refreshAccessToken = async (refreshToken) => {
    const { data } = await axios.post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        })
    );

    return { accessToken: data.access_token, expiresIn: data.expires_in };
};
