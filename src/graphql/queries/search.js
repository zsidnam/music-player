import { gql } from '@apollo/client';

export const SEARCH_QUERY = gql`
    query GetSearchResults($searchText: String!) {
        search(searchText: $searchText) {
            albums {
                items {
                    id
                    uri
                    name
                    artists {
                        id
                        uri
                        name
                    }
                    images {
                        height
                        width
                        url
                    }
                }
            }
            artists {
                items {
                    id
                    uri
                    name
                    images {
                        height
                        width
                        url
                    }
                }
            }
            tracks {
                items {
                    id
                    uri
                    name
                    artists {
                        id
                        uri
                        name
                    }
                    album {
                        id
                        uri
                        name
                        images {
                            height
                            width
                            url
                        }
                    }
                }
            }
        }
    }
`;
