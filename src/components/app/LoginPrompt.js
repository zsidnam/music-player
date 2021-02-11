import React from 'react';
import { Button, Box, Typography, useTheme } from '@material-ui/core';

import SpotifyIcon from '../../assets/spotify-logo-white.svg';

const LoginPrompt = () => {
    const theme = useTheme();

    return (
        <Box mt={20} overflow={'hidden'}>
            <Box
                mb={10}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <SpotifyIcon
                    width={60}
                    height={60}
                    fill={theme.palette.common.white}
                />

                <Box
                    ml={2}
                    px={2}
                    border={`2px solid ${theme.palette.primary.main}`}
                >
                    <Typography variant={'h1'}>MUSIC PLAYER</Typography>
                </Box>
            </Box>

            <Box textAlign={'center'}>
                <Typography variant={'h4'}>
                    Login to Spotify to use the music player.
                </Typography>

                <Box mt={3}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        href={'/api/auth/login'}
                    >
                        Log In
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPrompt;
