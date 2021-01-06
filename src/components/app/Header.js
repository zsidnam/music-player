import React from 'react';
import { Box, Grid } from '@material-ui/core';

import { useAuthContext } from '../../context/authContext';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import { HEADER_COLOR, CONTENT_PADDING } from '../../styles/theme';

const Header = () => {
    const { user } = useAuthContext();

    return (
        <Box
            px={CONTENT_PADDING}
            height={100}
            bgcolor={HEADER_COLOR}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Grid container justify={'space-between'} alignItems={'center'}>
                <Grid item>
                    <SearchBar loggedIn={!!user} />
                </Grid>
                <Grid item>
                    <UserMenu user={user} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Header;
