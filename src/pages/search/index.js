import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import SearchPrompt from '../../components/search/SearchPrompt';
import SearchResults from '../../components/search/SearchResults';
import MainLayout from '../../layouts/MainLayout';
import { useSearchContext } from '../../context/searchContext';
import { SEARCH_QUERY } from '../../graphql/queries/search';

const SearchPage = () => {
    const router = useRouter();
    const { searchText } = useSearchContext();
    const { loading, error, data } = useQuery(SEARCH_QUERY, {
        variables: {
            searchText,
        },
        skip: !searchText,
    });

    if (error) {
        router.push('/client-error');
        return null;
    }

    return searchText ? (
        <SearchResults loading={loading} results={data?.search} />
    ) : (
        <SearchPrompt />
    );
};

SearchPage.Layout = MainLayout;

export default SearchPage;
