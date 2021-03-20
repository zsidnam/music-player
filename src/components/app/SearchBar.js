import React, { useState, useCallback } from 'react';
import { Box, TextField, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import SearchIcon from '@material-ui/icons/Search';

import { useSearchContext } from '../../context/searchContext';

const useStyles = makeStyles(() => ({
    searchIcon: {
        marginRight: 5,
    },
}));

const SearchBar = ({ loggedIn }) => {
    const router = useRouter();
    const classes = useStyles();
    const [searchText, setSearchText] = useState('');
    const { setSearchText: updateSearchContext } = useSearchContext();

    const search = (text) => {
        updateSearchContext(text);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(debounce(search, 350), []);

    const handleClick = () => {
        if (router.pathname !== '/search') {
            router.push('/search');
        }
    };

    const handleChange = (e) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);
        debouncedSearch(newSearchText);
    };

    return (
        <Box>
            <TextField
                fullWidth
                value={searchText}
                onFocus={handleClick}
                onChange={handleChange}
                placeholder={'Search Music'}
                disabled={!loggedIn}
                InputProps={{
                    startAdornment: <SearchIcon className={classes.searchIcon} />,
                }}
            />
        </Box>
    );
};

SearchBar.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};

export default SearchBar;
