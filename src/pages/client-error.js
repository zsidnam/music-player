import React from 'react';
import { Box, Typography } from '@material-ui/core';
import SadIcon from '@material-ui/icons/SentimentDissatisfied';

import MainLayout from '../layouts/MainLayout';

const ErrorPage = () => {
    return (
        <Box
            height={'90vh'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Box fontSize={'5rem'}>
                <SadIcon fontSize={'inherit'} />
            </Box>
            <Box maxWidth={450}>
                <Typography variant={'h6'} align={'center'}>
                    Oops! Something bad happened! Please try again. If you still experience issues,
                    try logging out and then logging back in.
                </Typography>
            </Box>
        </Box>
    );
};

ErrorPage.Layout = MainLayout;

export default ErrorPage;
