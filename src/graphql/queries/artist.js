import { gql } from '@apollo/client';

export const ARTIST_QUERY = gql`
    query GetArtist($id: ID!) {
        artist(id: $id) {
            id
            name
            uri
            images {
                height
                width
                url
            }
        }
    }
`;

export const RELATED_ARTISTS_QUERY = gql`
    query GetRelatedArtists($artistId: ID!) {
        relatedArtists(artistId: $artistId) {
            artists {
                id
                uri
                name
                images {
                    width
                    height
                    url
                }
            }
        }
    }
`;

export const TOP_TRACKS_QUERY = gql`
    query GetTopTracks($artistId: ID!) {
        topTracks(artistId: $artistId) {
            tracks {
                id
                uri
                name
                explicit
                album {
                    id
                    uri
                    images {
                        width
                        height
                        url
                    }
                }
            }
        }
    }
`;

export const ARTIST_ALBUMS_QUERY = gql`
    query GetArtistAlbums($artistId: ID!, $limit: Int, $offset: Int) {
        artistAlbums(artistId: $artistId, limit: $limit, offset: $offset) {
            next
            items {
                id
                uri
                name
                images {
                    width
                    height
                    url
                }
                release_date
                release_date_precision
                album_group
                album_type
            }
        }
    }
`;
