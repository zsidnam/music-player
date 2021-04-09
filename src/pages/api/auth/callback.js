import { stringify } from 'querystring';

import { SPOTIFY_STATE_KEY, getTokens } from '../../../services/spotify-connect';
import { clearCookie } from '../../../utils/http';

export default async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(404).end();
    }

    // If user cancels auth request, return to landing page
    if (req.query.error && req.query.error === 'access_denied') {
        return res.redirect('/');
    }

    const { code, state } = req.query;
    const storedState = req.cookies ? req.cookies[SPOTIFY_STATE_KEY] : null;

    // Recommended security check for CSRF protection
    if (!state || state !== storedState) {
        return res.status(400).redirect('/error');
    }

    clearCookie(res, SPOTIFY_STATE_KEY);

    try {
        const { access_token, expires_in, refresh_token } = await getTokens(code);
        return res.redirect(
            '/#' +
                stringify({
                    access_token: access_token,
                    expires_in: expires_in,
                    refresh_token: refresh_token,
                })
        );
    } catch (err) {
        console.log(`Error retrieving access and refresh tokens: ${err.message}`);
        return res.redirect('/error');
    }
};
