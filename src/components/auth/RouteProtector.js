import React from 'react';
import { useAuthContext } from '../../context/authContext';

import Loader from '../app/Loader';
import LoginPrompt from '../app/LoginPrompt';

const RouteProtector = ({ children }) => {
    const { user, isLoading } = useAuthContext();

    // TODO: Need this to prevent server side rendering issues.
    // Clean up!
    /* if (isLoading) {
        return <Loader />;
    }

    // TODO: Switch back
    if (!user) {
        return <LoginPrompt />;
    } */

    return children;
};

export default RouteProtector;
