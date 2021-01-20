import React, { useState, useCallback } from 'react';
import { Box, TextField, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({
    searchIcon: {
        marginRight: 5,
    },
}));

const SearchBar = ({ loggedIn }) => {
    const router = useRouter();
    const classes = useStyles();
    const [searchText, setSearchText] = useState('');

    const search = (text) => {
        console.log(`Searching with ${text}`);
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchText) {
            search(searchText);
        }
    };

    return (
        <Box>
            <TextField
                fullWidth
                value={searchText}
                onClick={handleClick}
                onChange={handleChange}
                onKeyUp={handleKeyPress}
                placeholder={'Search Music'}
                disabled={!loggedIn}
                InputProps={{
                    startAdornment: (
                        <SearchIcon className={classes.searchIcon} />
                    ),
                }}
            />
        </Box>
    );
};

SearchBar.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};

export default SearchBar;
