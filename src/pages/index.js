import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';

import MainLayout from '../layouts/MainLayout';
import UserTopTracks from '../components/home/UserTopTracks';
import UserTopArtists from '../components/home/UserTopArtists';
import ColorizedContainer from '../components/common/ColorizedContainer';
import { useAuthContext } from '../context/authContext';
import { useImageColors } from '../hooks/useImageColors';
import UserSummary from '../components/home/UserSummary';

const LandingPage = () => {
    const { user } = useAuthContext();
    const { name, profilePic } = user || {};

    const { primaryDarkColor, primaryLightColor } = useImageColors(profilePic?.url);

    return (
        <Box mb={10}>
            <ColorizedContainer maxWidth={'lg'} primaryColor={primaryDarkColor}>
                <Box px={5} pb={5} pt={12}>
                    <UserSummary name={name} profilePic={profilePic} />
                </Box>
            </ColorizedContainer>

            <Container maxWidth={'lg'}>
                <Box px={5} mb={6}>
                    <Box mb={4}>
                        <Grid container spacing={5}>
                            <Grid item xs={7} md={8}>
                                <UserTopTracks primaryColor={primaryLightColor} />
                            </Grid>
                            <Grid item xs={5} md={4}>
                                <UserTopArtists />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

LandingPage.propTypes = {};

LandingPage.Layout = MainLayout;

export default LandingPage;
