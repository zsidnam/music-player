import PropTypes from 'prop-types';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    img: {
        borderRadius: '100%',
        border: '3px solid white',
        width: 250,
        height: 250,
    },
}));

const UserSummary = ({ name, profilePic }) => {
    const classes = useStyles();

    return (
        <Box display={'flex'} alignItems={'center'}>
            <img src={profilePic?.url} className={classes.img} />

            <Box ml={4} flex={1}>
                <Box mb={0.5}>
                    <Typography variant={'h3'}>Welcome to Music Player</Typography>
                </Box>

                <Box mb={2}>
                    <Typography
                        variant={'h3'}
                        color={'textSecondary'}
                        style={{ fontSize: '1.5rem' }}
                    >
                        {name}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

UserSummary.propTypes = {
    name: PropTypes.string,
    profilePic: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        url: PropTypes.string,
    }),
};

export default UserSummary;
