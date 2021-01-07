import React, { useState } from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import ProfileIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.common.grey,
        borderRadius: 100,
        padding: 3,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    userIcon: {
        fontSize: '2.25rem',
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
    const router = useRouter();
    const classes = useStyles();
    const [isHovering, setHovering] = useState(false);

    const handleMouseEnter = () => {
        setHovering(true);
    };

    const handleMouseLeave = () => {
        setHovering(false);
    };

    const handleClick = () => {
        user ? logout() : router.replace('/api/auth/login');
    };

    return (
        <Button
            className={classes.button}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {user ? (
                <img
                    className={classes.profilePic}
                    width={36}
                    height={36}
                    src={user.profilePic.url}
                />
            ) : (
                <ProfileIcon className={classes.userIcon} />
            )}
            <Typography variant={'button'} className={classes.buttonText}>
                {user ? (isHovering ? 'Log Out' : user.name) : 'Log In'}
            </Typography>
        </Button>
    );
};

UserMenu.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
};

export default UserMenu;
