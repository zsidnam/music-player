import { gql } from '@apollo/client';

export const USER_TOP_ARTISTS_QUERY = gql`
    query GetUserTopArtists($limit: Int, $offset: Int) {
        userTopArtists(limit: $limit, offset: $offset) {
            items {
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

export const USER_TOP_TRACKS_QUERY = gql`
    query GetUserTopTracks($limit: Int, $offset: Int) {
        userTopTracks(limit: $limit, offset: $offset) {
            items {
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
                artists {
                    id
                    uri
                    name
                }
            }
        }
    }
`;
