import React from 'react';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.common.lightGrey,
    },
    button: {
        padding: 5,
        '&:hover': {
            backgroundColor: theme.palette.common.darkGrey,
        },
    },
}));

// TODO: Attempted to make buttons smart and disable if they would navigate off the app,
// but Next does not currently expose the history or allow route change canceling out of the box.
// To avoid a hacky solution, I am going to leave the controls dumb for now.

const NavControls = () => {
    const classes = useStyles();

    const handleBack = () => {
        window.history.back();
    };

    const handleForward = () => {
        window.history.forward();
    };

    return (
        <Grid container alignItems={'center'} spacing={1}>
            <Grid item>
                <IconButton className={classes.button} onClick={handleBack}>
                    <BackIcon className={classes.icon} />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton className={classes.button} onClick={handleForward}>
                    <ForwardIcon className={classes.icon} />
                </IconButton>
            </Grid>
        </Grid>
    );
};

NavControls.propTypes = {};

export default NavControls;
