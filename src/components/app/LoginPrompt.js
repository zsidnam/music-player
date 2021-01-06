import React from 'react';
import { Button, Box, Typography, Grid, useTheme } from '@material-ui/core';

import SpotifyIcon from '../../assets/spotify-logo-white.svg';

const LoginPrompt = () => {
    const theme = useTheme();

    return (
        <Box mt={12}>
            <Box mb={10}>
                <Grid
                    container
                    justify={'center'}
                    alignItems={'center'}
                    spacing={2}
                >
                    <Grid item>
                        <SpotifyIcon
                            width={60}
                            height={60}
                            fill={theme.palette.common.white}
                        />
                    </Grid>

                    <Grid item>
                        <Box
                            border={`2px solid ${theme.palette.primary.main}`}
                            px={2}
                        >
                            <Typography variant={'h1'}>MUSIC PLAYER</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Grid container justify={'center'}>
                <Grid
                    item
                    container
                    spacing={2}
                    direction={'column'}
                    alignItems={'center'}
                >
                    <Grid item>
                        <Typography variant={'h4'}>
                            Login to Spotify to use the music player.
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            color={'primary'}
                            variant={'contained'}
                            href={'/api/auth/login'}
                        >
                            Log In
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

LoginPrompt.propTypes = {};

export default LoginPrompt;
