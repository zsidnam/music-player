'use strict';

// TODO: Get rid of web-api-node and use axios directly

import SpotifyWebApi from 'spotify-web-api-node';

import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../keys';

const REDIRECT_URI = 'http://localhost:3001/api/auth/callback';
const RESPONSE_TYPE = 'code';
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
    redirectUri: REDIRECT_URI,
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
});

export const getAuthURL = (stateString = null) => {
    const authURL = _spotifyApi.createAuthorizeURL(SCOPES, stateString, SHOW_DIALOG);

    return authURL;
};

export const getTokens = (authCode) => {
    return _spotifyApi.authorizationCodeGrant(authCode);
};
