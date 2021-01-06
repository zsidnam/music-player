import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const UserMenu = ({ user }) => {
    return (
        <Box>
            <Typography>{user ? 'Log Out' : 'Log In'}</Typography>
        </Box>
    );
};

UserMenu.propTypes = {
    user: PropTypes.object,
};

export default UserMenu;
