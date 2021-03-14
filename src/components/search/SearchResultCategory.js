import PropTypes from 'prop-types';
import { Box, Typography, Divider, Grid } from '@material-ui/core';

import TextLink from '../common/TextLink';

const SearchResultCategory = ({ title, seeAllHref, renderResult, items }) => {
    return (
        <Box>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'baseline'}>
                <Typography>{title}</Typography>
                <TextLink text={'See All'} href={seeAllHref || '/cat'} />
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
    seeAllHref: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    renderResult: PropTypes.func.isRequired,
};

export default SearchResultCategory;
