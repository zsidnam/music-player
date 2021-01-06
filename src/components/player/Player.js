import React from 'react';
import { Box } from '@material-ui/core';

import PlayingInfo from './PlayingInfo';
import PrimaryControls from './PrimaryControls';
import SecondaryControls from './SecondaryControls';
import { useAuthContext } from '../../context/authContext';
import { PLAYER_COLOR } from '../../styles/theme';

const Player = () => {
    const { user, isLoading } = useAuthContext();

    return (
        <Box
            height={100}
            bgcolor={PLAYER_COLOR}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            px={4}
        >
            <PlayingInfo loggedIn={!!user} />
            <PrimaryControls loggedIn={!!user} />
            <SecondaryControls loggedIn={!!user} />
        </Box>
    );
};

export default Player;
