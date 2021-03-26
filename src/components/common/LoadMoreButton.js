import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton, CircularProgress, makeStyles } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '5rem',
        minWidth: '4.25rem',
    },
    icon: {
        color: theme.palette.common.lightGrey,
        fontSize: '3.5rem',
    },
    button: {
        '&:hover': {
            backgroundColor: theme.palette.common.darkGrey,
        },
    },
    loader: {
        color: theme.palette.common.lightGrey,
    },
}));

const LoadMoreButton = ({ onLoadMore }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await onLoadMore();
        setLoading(false);
    };

    return (
        <Box className={classes.container}>
            {loading ? (
                <Box mb={1}>
                    <CircularProgress size={'2.5rem'} className={classes.loader} />
                </Box>
            ) : (
                <IconButton onClick={handleClick} className={classes.button}>
                    <RefreshIcon className={classes.icon} />
                </IconButton>
            )}
            <Typography color={'textSecondary'} variant={'caption'}>
                Load More
            </Typography>
        </Box>
    );
};

LoadMoreButton.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
};

export default LoadMoreButton;
