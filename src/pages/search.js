import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import MainLayout from '../layouts/MainLayout';

const SearchPage = () => {
    const searchContent = null;

    return (
        <Box margin={'2rem 10rem'}>
            {searchContent ? (
                <Box>Check it out!</Box>
            ) : (
                <Box>Please search for something</Box>
            )}
        </Box>
    );
};

SearchPage.propTypes = {};

SearchPage.Layout = MainLayout;

export default SearchPage;
