import { refreshAccessToken } from '../../../services/spotify-connect'

export default (req, res) => {
    try {
        if (req.method !== 'POST') {
            return res.status(404).end();
        }

        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).end();
        }

        const newAccessToken = await refreshAccessToken(refreshToken);
        return res.status(200).json({ accessToken: newAccessToken})
    } catch (err) {
        return res.status(500).end();
    }
}