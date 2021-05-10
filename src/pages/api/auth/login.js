import { getAuthURL, SPOTIFY_STATE_KEY } from '../../../services/spotify-auth';
import { getRandomString } from '../../../utils/strings';
import { setCookie } from '../../../utils/http';

export default (req, res) => {
    try {
        if (req.method !== 'GET') {
            return res.status(404).end();
        }

        // Recommended security measure for CSRF protection
        const stateString = getRandomString(16);
        setCookie(res, SPOTIFY_STATE_KEY, stateString);

        return res.redirect(getAuthURL(stateString));
    } catch (err) {
        return res.status(500).end();
    }
};
