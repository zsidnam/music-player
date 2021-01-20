import { Grid, IconButton } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';

// TODO: Attempted to make buttons smart and disable if they would navigate off the app,
// but Next does not currently expose the history or allow route change canceling out of the box.
// To avoid a hacky solution, I am going to leave the controls dumb for now.

const NavControls = () => {
    const handleBack = () => {
        window.history.back();
    };

    const handleForward = () => {
        window.history.forward();
    };

    return (
        <Grid container alignItems={'center'} spacing={1}>
            <Grid item>
                <IconButton color={'secondary'} onClick={handleBack}>
                    <BackIcon />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton color={'secondary'} onClick={handleForward}>
                    <ForwardIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default NavControls;
