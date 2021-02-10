import axios from 'axios';

export const resolvers = {
    Query: {
        album: async (_, args, context) => {
            try {
                const { data } = await axios.get(
                    `https://api.spotify.com/v1/albums/${args.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${context.spotifyToken}`,
                        },
                    }
                );

                return data;
            } catch (err) {
                // TODO: Come up with error handling strategy
                console.log(err);
                throw err;
            }
        },
    },
};
