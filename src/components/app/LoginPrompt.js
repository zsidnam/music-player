import React from 'react';
import { Button, Box, Typography, Grid, useTheme } from '@material-ui/core';

import SpotifyIcon from '../../assets/spotify-logo-green.svg';
import MainLayout from '../../layouts/MainLayout';

const LoginPrompt = () => {
    const theme = useTheme();

    // Add MainLayout wrapper so that login message keeps
    // structure of other pages without actually being a page
    // TODO: See if this can be moved
    return (
        <MainLayout>
            <Box mt={12}>
                <Box mb={10} display={'flex'} justifyContent={'center'}>
                    <Box
                        border={`2px solid ${theme.palette.primary.main}`}
                        px={2}
                    >
                        <Typography variant={'h1'}>MUSIC PLAYER</Typography>
                    </Box>
                </Box>
                <Grid container justify={'center'}>
                    <Grid item>
                        <Grid
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
                            <Grid
                                item
                                container
                                alignItems={'center'}
                                justify={'center'}
                                spacing={1}
                            >
                                <Grid item>
                                    <SpotifyIcon width={90} height={90} />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant={'contained'}
                                        href={'/api/auth/login'}
                                    >
                                        Log In
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </MainLayout>
    );
};

LoginPrompt.propTypes = {};

export default LoginPrompt;
