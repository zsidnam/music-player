import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Context used to share small subset of player state information with
 * other parts of the application.
 */

export const SearchContext = createContext({});

export const SearchContextProvider = ({ children }) => {
    const [searchText, setSearchText] = useState('');

    const store = {
        searchText,
        setSearchText,
    };

    return <SearchContext.Provider value={store}>{children}</SearchContext.Provider>;
};

SearchContextProvider.propTypes = {
    children: PropTypes.node,
};

export const useSearchContext = () => useContext(SearchContext);
