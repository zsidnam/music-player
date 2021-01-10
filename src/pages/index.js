import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';

import MainLayout from '../layouts/MainLayout';

const LandingPage = () => {
    useEffect(() => {
        // check if there is a current player context
    }, []);

    return (
        <Box margin={'2rem 10rem'}>This should do some sort of redirect</Box>
    );
};

LandingPage.propTypes = {};

LandingPage.Layout = MainLayout;

export default LandingPage;
