import { gql } from '@apollo/client';

export const ALBUM_QUERY = gql`
    query GetAlbum($id: ID!) {
        album(id: $id) {
            id
            uri
            name
            release_date
            total_tracks
            copyrights {
                text
                type
            }
            images {
                height
                width
                url
            }
            artists {
                id
                name
            }
            tracks {
                items {
                    id
                    name
                    duration_ms
                    track_number
                    uri
                    album {
                        id
                        name
                    }
                    artists {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const ALBUM_TRACKS_QUERY = gql`
    query GetAlbumTracks($albumId: ID!, $limit: Int, $offset: Int) {
        albumTracks(albumId: $albumId, limit: $limit, offset: $offset) {
            next
            items {
                id
                uri
                name
                duration_ms
                track_number
                artists {
                    id
                    name
                }
            }
        }
    }
`;
