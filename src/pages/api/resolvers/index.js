import axios from 'axios';
import _get from 'lodash.get';

export const resolvers = {
    Query: {
        album: async (_, args, context) => {
            try {
                const { data: album } = await axios.get(
                    `https://api.spotify.com/v1/albums/${args.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${context.accessToken}`,
                        },
                    }
                );

                // Add album name onto tracks
                if (Array.isArray(_get(album, 'tracks.items'))) {
                    album.tracks.items = album.tracks.items.map((track) => ({
                        ...track,
                        album: album.name,
                    }));
                }

                return album;
            } catch (err) {
                // TODO: Come up with error handling strategy
                console.log(err);
                throw err;
            }
        },
    },
};
