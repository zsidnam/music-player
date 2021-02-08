import React from 'react';
import { Box, Grid } from '@material-ui/core';

import { useAuthContext } from '../../context/authContext';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import LoginButton from './LoginButton';
import NavControls from './NavControls';

const Header = () => {
    const { user, logout } = useAuthContext();

    return (
        <Box
            px={5}
            height={75}
            bgcolor={'transparent'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Grid container justify={'space-between'} alignItems={'center'}>
                <Grid item>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item>
                            <NavControls />
                        </Grid>
                        <Grid item>
                            <SearchBar loggedIn={!!user} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    {user ? (
                        <UserMenu user={user} logout={logout} />
                    ) : (
                        <LoginButton />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Header;
