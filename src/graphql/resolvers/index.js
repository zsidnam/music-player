import axios from 'axios';
import _get from 'lodash.get';

const SEARCH_DEFAULTS = Object.freeze({
    type: 'album,artist,track',
    limit: 5,
});

const ARTIST_ALBUMS_DEFAULTS = Object.freeze({
    limit: 20,
    groups: 'album,single',
});

const ALBUM_TRACKS_DEFAULTS = Object.freeze({
    limit: 25,
});

const USER_TOP_TRACKS_DEFAULTS = Object.freeze({
    limit: 10,
});

const USER_TOP_ARTISTS_DEFAULTS = Object.freeze({
    limit: 10,
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
                        SEARCH_DEFAULTS.type
                    }&limit=${args.limit || SEARCH_DEFAULTS.limit}&offset=${args.offset || 0}`,
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
                const { data: relatedArtists } = await axios.get(
                    `https://api.spotify.com/v1/artists/${args.artistId}/related-artists`,
                    {
                        headers: {
                            Authorization: `Bearer ${context.accessToken}`,
                        },
                    }
                );

                return relatedArtists;
            } catch (err) {
                // TODO: Come up with error handling strategy
                console.log(err);
                throw err;
            }
        },
        artistAlbums: async (_, args, context) => {
            try {
                const { data: artistAlbums } = await axios.get(
                    `https://api.spotify.com/v1/artists/${
                        args.artistId
                    }/albums?market=from_token&limit=${
                        args.limit || ARTIST_ALBUMS_DEFAULTS.limit
                    }&offset=${args.offset || 0}&include_groups=${ARTIST_ALBUMS_DEFAULTS.groups}`,
                    {
                        headers: {
                            Authorization: `Bearer ${context.accessToken}`,
                        },
                    }
                );

                return artistAlbums;
            } catch (err) {
                // TODO: Come up with error handling strategy
                console.log(err);
                throw err;
            }
        },
        albumTracks: async (_, args, context) => {
            try {
                const { data: albumTracks } = await axios.get(
                    `https://api.spotify.com/v1/albums/${
                        args.albumId
                    }/tracks?market=from_token&limit=${
                        args.limit || ALBUM_TRACKS_DEFAULTS.limit
                    }&offset=${args.offset || 0}`,
                    {
                        headers: {
                            Authorization: `Bearer ${context.accessToken}`,
                        },
                    }
                );

                return albumTracks;
            } catch (err) {
                // TODO: Come up with error handling strategy
                console.log(err);
                throw err;
            }
        },
        userTopTracks: async (_, args, context) => {
            try {
                const { data: topTracks } = await axios.get(
                    `https://api.spotify.com/v1/me/top/tracks?limit=${
                        args.limit || USER_TOP_TRACKS_DEFAULTS.limit
                    }&offset=${args.offset || 0}`,
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
        userTopArtists: async (_, args, context) => {
            try {
                const { data: topArtists } = await axios.get(
                    `https://api.spotify.com/v1/me/top/artists?limit=${
                        args.limit || USER_TOP_ARTISTS_DEFAULTS.limit
                    }&offset=${args.offset || 0}`,
                    {
                        headers: {
                            Authorization: `Bearer ${context.accessToken}`,
                        },
                    }
                );

                return topArtists;
            } catch (err) {
                // TODO: Come up with error handling strategy
                console.log(err);
                throw err;
            }
        },
    },
};
