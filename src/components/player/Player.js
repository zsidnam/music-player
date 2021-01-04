import React from 'react';
import { Box } from '@material-ui/core';

import { PLAYER_COLOR } from '../../styles/theme';

const Player = () => {
    return <Box height={100} bgcolor={PLAYER_COLOR}></Box>;
};

export default Player;
