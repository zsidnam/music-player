import React from 'react';
import { Box, useTheme } from '@material-ui/core';

import Player from '../components/player/Player';
import Header from '../components/app/Header';

const MainLayout = ({ children }) => {
    return (
        <Box
            id={'app-container'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            height={'100vh'}
        >
            <Box
                id={'primary-container'}
                flex={1}
                display={'flex'}
                overflow={'hidden'}
            >
                <Box overflow={'auto'} flex={1}>
                    <Box
                        id={'header-container'}
                        position={'sticky'}
                        top={0}
                        zIndex={100}
                    >
                        <Header />
                    </Box>
                    <Box id={'content-container'} p={5}>
                        {children}
                    </Box>
                </Box>
            </Box>

            <Box id={'player-container'} flex={'none'}>
                <Player />
            </Box>
        </Box>
    );
};

export default MainLayout;
