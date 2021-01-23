import React from 'react';

import WebPlayer from './web-player/WebPlayer';
import { useAuthContext } from '../../context/authContext';

const PlayerContainer = () => {
    const { user, accessToken } = useAuthContext();

    // TODO: Show skeleton or some better placeholder if no token

    return user ? <WebPlayer token={accessToken} /> : null;
};

export default PlayerContainer;
