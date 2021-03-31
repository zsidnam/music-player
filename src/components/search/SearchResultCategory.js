import PropTypes from 'prop-types';
import { Box, Typography, Divider, Grid } from '@material-ui/core';

import TextLink from '../common/TextLink';

const SearchResultCategory = ({ title, seeAllHref, renderResult, items }) => {
    return (
        <Box>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'baseline'} pr={1}>
                <Typography variant={'overline'}>{title}</Typography>
                <TextLink
                    TypographyProps={{ color: 'textSecondary', variant: 'caption' }}
                    text={'See All'}
                    href={seeAllHref}
                />
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
