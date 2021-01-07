import React from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
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
    buttonText: {
        margin: '0 1rem 0 0.5rem',
    },
}));

const LoginButton = () => {
    const router = useRouter();
    const classes = useStyles();

    const handleClick = () => {
        router.replace('/api/auth/login');
    };

    return (
        <Button className={classes.button} onClick={handleClick}>
            <ProfileIcon className={classes.userIcon} />
            <Typography variant={'button'} className={classes.buttonText}>
                Log In
            </Typography>
        </Button>
    );
};

export default LoginButton;
