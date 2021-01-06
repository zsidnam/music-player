import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const SecondaryControls = ({ loggedIn }) => {
    if (!loggedIn) {
        return <Box>Log In!!!</Box>;
    }

    return <Box>Secondary Controls</Box>;
};

SecondaryControls.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};

export default SecondaryControls;
