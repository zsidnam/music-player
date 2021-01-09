import React from 'react';
import { Box, TextField, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    searchIcon: {
        marginRight: 5,
    },
}));

const SearchBar = ({ loggedIn }) => {
    const router = useRouter();
    const classes = useStyles();

    return (
        <Box>
            <TextField
                onClick={() => {
                    router.push('/search');
                }}
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
