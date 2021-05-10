import React from 'react';

import WebPlayer from './web-player/WebPlayer';
import { useAuthContext } from '../../context/authContext';

const PlayerContainer = () => {
    const { user } = useAuthContext();
    return user ? <WebPlayer /> : null;
};

export default PlayerContainer;
