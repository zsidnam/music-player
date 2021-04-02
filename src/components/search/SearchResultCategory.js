import PropTypes from 'prop-types';
import { Box, Typography, Divider, Grid } from '@material-ui/core';

const SearchResultCategory = ({ title, renderResult, items }) => {
    return (
        <Box>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'baseline'} pr={1}>
                <Typography variant={'overline'}>{title}</Typography>
            </Box>

            <Box mb={2}>
                <Divider />
            </Box>

            <Grid container spacing={3}>
                {items.map(renderResult)}
            </Grid>
        </Box>
    );
};

SearchResultCategory.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    renderResult: PropTypes.func.isRequired,
};

export default SearchResultCategory;
