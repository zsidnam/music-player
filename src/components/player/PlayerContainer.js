import React from 'react';
import { Box } from '@material-ui/core';

import WebPlayer from './web-player/WebPlayer';
import { useAuthContext } from '../../context/authContext';
import { PLAYER_COLOR } from '../../styles/theme';

const PlayerContainer = () => {
    const { user, accessToken } = useAuthContext();

    return (
        <Box
            height={100}
            bgcolor={PLAYER_COLOR}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            px={4}
        >
            {user ? <WebPlayer token={accessToken} /> : null}
        </Box>
    );
};

export default PlayerContainer;
