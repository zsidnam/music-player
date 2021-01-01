import { stringify } from 'querystring';

import {
    SPOTIFY_STATE_KEY,
    SPOTIFY_REFRESH_TOKEN_KEY,
    getTokens,
} from '../../../services/spotify-connect';
import { setCookie, clearCookie } from '../../../utils/http';

export default async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(404).end();
    }

    const { code, state } = req.query;
    const storedState = req.cookies ? req.cookies[SPOTIFY_STATE_KEY] : null;

    // Recommended security check for CSRF protection
    if (!state || state !== storedState) {
        return res.status(400).redirect('/error');
    }

    // Clear
    // TODO: Fix this
    //clearCookie(res, SPOTIFY_STATE_KEY);

    try {
        const { body } = await getTokens(code);

        // Store refresh token in cookie, expose access
        // token to client so it can be saved in app state.
        setCookie(res, SPOTIFY_REFRESH_TOKEN_KEY, body.refresh_token);

        return res.redirect(
            '/#' +
                stringify({
                    access_token: body.access_token,
                    expires_in: body.expires_in,
                })
        );
    } catch (err) {
        console.log(
            `Error retrieving access and refresh tokens: ${err.message}`
        );
        return res.status(500).end();
    }
};
