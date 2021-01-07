import React, { useState } from 'react';
import {
    Button,
    Typography,
    Menu,
    MenuItem,
    makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.common.grey,
        borderRadius: 100,
        padding: 3,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    menu: {
        backgroundColor: theme.palette.common.grey,
        marginTop: '0.5rem',
    },
    menuItemList: {
        padding: 0,
    },
    menuItem: {
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    profilePic: {
        borderRadius: 100,
        padding: 2,
    },
    buttonText: {
        margin: '0 1rem 0 0.5rem',
    },
}));

const UserMenu = ({ user, logout }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button className={classes.button} onClick={handleClick}>
                <img
                    src={user.profilePic.url}
                    className={classes.profilePic}
                    width={36}
                    height={36}
                />
                <Typography variant={'button'} className={classes.buttonText}>
                    {user.name}
                </Typography>
            </Button>
            <Menu
                id={'user-menu'}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                classes={{ paper: classes.menu, list: classes.menuItemList }}
            >
                <MenuItem
                    className={classes.menuItem}
                    onClick={() => logout()}
                    dense
                >
                    Log Out
                </MenuItem>
            </Menu>
        </>
    );
};

UserMenu.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
};

export default UserMenu;
