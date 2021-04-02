import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

import MainLayout from '../layouts/MainLayout';

const LandingPage = () => {
    return (
        <Box mb={10}>
            <Container maxWidth={'lg'}>
                <Box px={5} pb={5} pt={12}>
                    <Typography align={'center'} style={{ fontSize: '2.5rem' }} variant={'h3'}>
                        Welcome to Music Player
                    </Typography>
                </Box>
            </Container>

            <Container maxWidth={'lg'}>
                <Box mx={5} pt={5}></Box>
            </Container>
        </Box>
    );
};

LandingPage.propTypes = {};

LandingPage.Layout = MainLayout;

export default LandingPage;
