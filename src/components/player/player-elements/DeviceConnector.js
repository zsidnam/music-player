import PropTypes from 'prop-types';
import { Typography, Box, MenuItem, makeStyles, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    menuItem: {
        '&:hover': {
            outline: `1px solid ${theme.palette.primary.main}`,
        },
    },
    offWhite: {
        color: theme.palette.common.offWhite,
    },
}));

const DeviceFinder = ({ syncActiveDevice, pollingPlayerState }) => {
    const classes = useStyles();

    const handleClick = (e) => {
        syncActiveDevice();
    };

    // TODO: Automatically close menu once device has been found

    return (
        <MenuItem disabled={pollingPlayerState} onClick={handleClick} className={classes.menuItem}>
            <Box display={'flex'} alignItems={'center'}>
                <Box mr={2} minWidth={24} minHeight={31}>
                    {pollingPlayerState ? (
                        <CircularProgress size={24} />
                    ) : (
                        <SearchIcon className={classes.offWhite} size={'small'} />
                    )}
                </Box>
                <Typography className={classes.offWhite} variant={'caption'}>
                    Find Active Device
                </Typography>
            </Box>
        </MenuItem>
    );
};

DeviceFinder.propTypes = {
    pollingPlayerState: PropTypes.bool,
    syncActiveDevice: PropTypes.func,
};

export default DeviceFinder;
