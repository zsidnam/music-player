import React from 'react';
import { Box } from '@material-ui/core';

import { useAuthContext } from '../context/authContext';
import MainLayout from '../layouts/MainLayout';

const LandingPage = () => {
    const { user } = useAuthContext();

    return (
        <Box margin={'2rem 10rem'}>
            <p>You are logged in.</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <img src={user.profilePic.url} />
        </Box>
    );
};

LandingPage.propTypes = {};

LandingPage.Layout = MainLayout;

export default LandingPage;
