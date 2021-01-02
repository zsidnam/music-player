import React from 'react';

import { useAuthContext } from '../context/authContext';
import MainLayout from '../layouts/MainLayout';

const LandingPage = () => {
    const { user } = useAuthContext();

    return (
        <div>
            <p>You are logged in.</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <img src={user.profilePic.url} />
        </div>
    );
};

LandingPage.propTypes = {};

LandingPage.Layout = MainLayout;

export default LandingPage;
