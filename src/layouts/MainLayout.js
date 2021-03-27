import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

import PlayerContainer from '../components/player/PlayerContainer';
import Header from '../components/app/Header';
import GlobalContextMenu from '../components/contextMenu/GlobalContextMenu';
import { SCROLLABLE_CONTENT_CONTAINER_ID } from '../utils/constants';

const MainLayout = ({ children }) => {
    return (
        <>
            <Box
                id={'app-container'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                height={'100vh'}
                minWidth={'850px'}
            >
                <Box id={'primary-container'} flex={1} display={'flex'} overflow={'hidden'}>
                    <Box overflow={'auto'} flex={1} id={SCROLLABLE_CONTENT_CONTAINER_ID}>
                        <Box
                            id={'header-container'}
                            position={'absolute'}
                            width={'100%'}
                            top={0}
                            zIndex={100}
                        >
                            <Header />
                        </Box>
                        <Box id={'content-container'}>{children}</Box>
                    </Box>
                </Box>

                <Box id={'player-container'} flex={'none'}>
                    <PlayerContainer />
                </Box>
            </Box>

            <GlobalContextMenu />
        </>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node,
};

export default MainLayout;
