import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const PlayingInfo = ({ loggedIn }) => {
    if (!loggedIn) {
        return <Box>Log In!!!</Box>;
    }

    return <Box>Playing Info</Box>;
};

PlayingInfo.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};

export default PlayingInfo;
