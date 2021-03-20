import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

const RelatedArtists = () => {
    return (
        <Box>
            <Box mb={2}>
                <Typography variant={'overline'}>Related Artists</Typography>
            </Box>
        </Box>
    );
};

RelatedArtists.propTypes = {};

export default RelatedArtists;
