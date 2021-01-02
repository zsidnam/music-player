import React from 'react';
import { Button } from '@material-ui/core';

import MainLayout from '../../layouts/MainLayout';

const LoginPrompt = () => {
    // Add MainLayout wrapper so that login message keeps
    // structure of other pages without actually being a page
    // TODO: See if this can be moved
    return (
        <MainLayout>
            <Button variant={'contained'} href={'/api/auth/login'}>
                Login
            </Button>
        </MainLayout>
    );
};

LoginPrompt.propTypes = {};

export default LoginPrompt;
