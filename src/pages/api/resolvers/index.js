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

                // Add album name, id onto tracks
                if (Array.isArray(_get(album, 'tracks.items'))) {
                    album.tracks.items = album.tracks.items.map((track) => ({
                        ...track,
                        album: { name: album.name, id: album.id },
                    }));
                }

                return album;
            } catch (err) {
                // TODO: Come up with error handling strategy
                console.log(err);
                throw err;
            }
        },
        artist: async (_, args, context) => {
            try {
                const { data: artist } = await axios.get(
                    `https://api.spotify.com/v1/artists/${args.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${context.accessToken}`,
                        },
                    }
                );

                return artist;
            } catch (err) {
                // TODO: Come up with error handling strategy
                console.log(err);
                throw err;
            }
        },
        search: async (_, args, context) => {
            // TODO: Escape spaces and any other chars
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
        topTracks: async (_, args, context) => {
            try {
                const { data: topTracks } = await axios.get(
                    `https://api.spotify.com/v1/artists/${args.artistId}/top-tracks?market=from_token`,
                    {
                        headers: {
                            Authorization: `Bearer ${context.accessToken}`,
                        },
                    }
                );

                return topTracks;
            } catch (err) {
                // TODO: Come up with error handling strategy
                console.log(err);
                throw err;
            }
        },
        relatedArtists: async (_, args, context) => {
            try {
                const { data: artists } = await axios.get(
                    `https://api.spotify.com/v1/artists/${args.artistId}/related-artists`,
                    {
                        headers: {
                            Authorization: `Bearer ${context.accessToken}`,
                        },
                    }
                );

                return artists;
            } catch (err) {
                // TODO: Come up with error handling strategy
                console.log(err);
                throw err;
            }
        },
    },
};
