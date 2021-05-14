import React from 'react';
import { useAuthContext } from '../../context/authContext';

import LoginPrompt from '../app/LoginPrompt';

const RouteProtector = ({ children }) => {
    const { user, isLoading } = useAuthContext();

    if (isLoading) {
        return null;
    }

    if (!user) {
        return <LoginPrompt />;
    }

    return children;
};

export default RouteProtector;
