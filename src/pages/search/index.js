import { useQuery, gql } from '@apollo/client';

import SearchPrompt from '../../components/search/SearchPrompt';
import SearchResults from '../../components/search/SearchResults';
import MainLayout from '../../layouts/MainLayout';
import { useSearchContext } from '../../context/searchContext';

const SEARCH_QUERY = gql`
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

const SearchPage = () => {
    const { searchText } = useSearchContext();
    const { loading, error, data } = useQuery(SEARCH_QUERY, {
        variables: {
            searchText,
        },
        skip: !searchText,
    });

    // TODO: Add error handling
    if (error) return <>Error</>;

    return searchText ? (
        <SearchResults loading={loading} results={data?.search} />
    ) : (
        <SearchPrompt />
    );
};

SearchPage.Layout = MainLayout;

export default SearchPage;
