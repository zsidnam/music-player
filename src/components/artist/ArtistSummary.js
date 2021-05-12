import PropTypes from 'prop-types';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';

import PlayContextButton from '../common/PlayContextButton';

const useStyles = makeStyles((theme) => ({
    titleText: {
        fontSize: '4rem',
        maxWidth: '70%',
    },
    container: {
        height: 300,
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundSize: 'cover',
        backgroundPosition: '50% 20%',
        backgroundImage: ({ artistImgSrc }) =>
            `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url(${artistImgSrc})`,
    },
}));

const ArtistSummary = ({ artist, primaryColor }) => {
    const artistImgSrc = artist.images.length && artist.images[0].url;
    const classes = useStyles({ artistImgSrc });

    return (
        <motion.div
            className={classes.container}
            initial={{ opacity: 0, backgroundPosition: '0% 0%' }}
            animate={{ opacity: 1, backgroundPosition: '50% 20%' }}
            transition={{ duration: 0.5 }}
        >
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <Typography variant={'h3'} className={classes.titleText}>
                    {artist.name}
                </Typography>

                <Box mb={1}>
                    <PlayContextButton primaryColor={primaryColor} uri={artist.uri} />
                </Box>
            </Box>
        </motion.div>
    );
};

ArtistSummary.propTypes = {
    primaryColor: PropTypes.string,
    artist: PropTypes.shape({}).isRequired,
};

export default ArtistSummary;
