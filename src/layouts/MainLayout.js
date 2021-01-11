import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

import PlayerContainer from '../components/player/PlayerContainer';
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
                <PlayerContainer />
            </Box>
        </Box>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node,
};

export default MainLayout;
