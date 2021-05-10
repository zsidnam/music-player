import { refreshAccessToken } from '../../../services/spotify-auth';

export default async (req, res) => {
    try {
        if (req.method !== 'POST') {
            return res.status(404).end();
        }

        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).end();
        }

        const { accessToken, expiresIn } = await refreshAccessToken(refreshToken);
        return res.status(200).json({ accessToken, expiresIn });
    } catch (err) {
        return res.status(500).end();
    }
};
