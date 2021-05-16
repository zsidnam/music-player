import React, { useState, useCallback, useRef } from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import { useSearchContext } from '../../context/searchContext';

const useStyles = makeStyles((theme) => ({
    searchIcon: {
        marginRight: 5,
    },
    clearIcon: {
        cursor: 'pointer',
        marginLeft: 5,
        color: theme.palette.common.lightGrey,
    },
}));

const SearchBar = ({ loggedIn }) => {
    const router = useRouter();
    const classes = useStyles();
    const [searchText, setSearchText] = useState('');
    const { setSearchText: updateSearchContext } = useSearchContext();
    const inputRef = useRef();

    const search = (text) => {
        updateSearchContext(text);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(debounce(search, 250), []);

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

    const handleClear = () => {
        setSearchText('');
        debouncedSearch('');
        inputRef.current.focus();
    };

    return (
        <TextField
            fullWidth
            inputRef={inputRef}
            value={searchText}
            onFocus={handleClick}
            onChange={handleChange}
            placeholder={'Search Music'}
            disabled={!loggedIn}
            InputProps={{
                startAdornment: <SearchIcon className={classes.searchIcon} />,
                endAdornment: loggedIn ? (
                    <ClearIcon onClick={handleClear} className={classes.clearIcon} />
                ) : null,
            }}
        />
    );
};

SearchBar.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};

export default SearchBar;
