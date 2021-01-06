import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const PrimaryControls = ({ loggedIn }) => {
    if (!loggedIn) {
        return <Box>Log In!!!</Box>;
    }

    return <Box>Primary Controls</Box>;
};

PrimaryControls.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};

export default PrimaryControls;
