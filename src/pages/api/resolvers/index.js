import axios from 'axios';
import _get from 'lodash.get';

const SEARCH_SETTINGS = Object.freeze({
    type: 'album,artist,track',
    market: 'from_token',
    limit: 5,
});

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
                        album: { name: album.name },
                    }));
                }

                return album;
            } catch (err) {
                // TODO: Come up with error handling strategy
                console.log(err);
                throw err;
            }
        },
        search: async (_, args, context) => {
            // TODO: Escape spaces and any other chars
            console.log(args.searchText);
            try {
                const { data: searchResults } = await axios.get(
                    `https://api.spotify.com/v1/search/?q=${args.searchText}&type=${
                        SEARCH_SETTINGS.type
                    }&limit=${args.limit || SEARCH_SETTINGS.limit}&offset=${args.offset || 0}`,
                    {
                        headers: {
                            Authorization: `Bearer ${context.accessToken}`,
                        },
                    }
                );

                return searchResults;
            } catch (err) {
                // TODO: Come up with error handling strategy
                console.log(err);
                throw err;
            }
        },
    },
};
