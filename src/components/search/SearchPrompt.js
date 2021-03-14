import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

const SearchPrompt = () => {
    return (
        <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography>Search for something</Typography>
        </Box>
    );
};

SearchPrompt.propTypes = {};

export default SearchPrompt;
