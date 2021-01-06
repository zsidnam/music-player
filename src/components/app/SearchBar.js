import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const SearchBar = ({ loggedIn }) => {
    if (!loggedIn) {
        return <Box>Log In!!!</Box>;
    }

    return <Box>Search Bar</Box>;
};

SearchBar.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};

export default SearchBar;
