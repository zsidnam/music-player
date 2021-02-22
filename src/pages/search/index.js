import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

import MainLayout from '../../layouts/MainLayout';

const SearchPage = () => {
    const emptySearchMessage = (
        <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography>Search for something</Typography>
        </Box>
    );

    return (
        <Box height={'100%'} mt={10}>
            {emptySearchMessage}
        </Box>
    );
};

SearchPage.propTypes = {};

SearchPage.Layout = MainLayout;

export default SearchPage;
