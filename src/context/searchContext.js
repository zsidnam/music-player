import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Context used to share small subset of player state information with
 * other parts of the application.
 */

export const SearchContext = createContext({});

export const SearchContextProvider = ({ children }) => {
    const [searchText, setSearchText] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);

    const store = {
        searchText,
        setSearchText,
        recentSearches,
        addRecentSearch: (searchData) => {
            // Remove any previous searches for same result
            const updatedSearchResults = recentSearches.filter(
                (search) => search.href !== searchData.href
            );
            updatedSearchResults.unshift(searchData);
            setRecentSearches(updatedSearchResults);
        },
        removeRecentSearch: (searchHref) => {
            const updatedSearchResults = recentSearches.filter(
                (search) => search.href !== searchHref
            );
            setRecentSearches(updatedSearchResults);
        },
        clearSearchHistory: () => {
            setRecentSearches([]);
        },
    };

    return <SearchContext.Provider value={store}>{children}</SearchContext.Provider>;
};

SearchContextProvider.propTypes = {
    children: PropTypes.node,
};

export const useSearchContext = () => useContext(SearchContext);
