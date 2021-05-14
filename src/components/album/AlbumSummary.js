import PropTypes from 'prop-types';
import { Box, Typography, makeStyles } from '@material-ui/core';
import moment from 'moment';
import { motion } from 'framer-motion';

import TextLink from '../common/TextLink';
import PlayContextButton from '../common/PlayContextButton';

const useStyles = makeStyles((theme) => ({
    titleText: {
        fontSize: '2.5rem',
        lineHeight: '2.5rem',
        fontWeight: 500,
        maxWidth: '70%',
    },
}));

const AlbumSummary = ({ album, primaryColor }) => {
    const classes = useStyles();
    const { uri, artists, name, release_date, total_tracks, images } = album;
    const albumArtImgSrc = images.length && images[1].url;
    const metaDataString = `${moment(release_date).format('MMM YYYY')}, ${total_tracks} songs`;

    return (
        <Box display={'flex'} alignItems={'center'}>
            <motion.img
                layoutId={`album-${album.id}`}
                src={albumArtImgSrc}
                style={{ maxWidth: 300, maxHeight: 300 }}
            />

            <Box ml={4} flex={1}>
                <Typography variant={'h3'} className={classes.titleText}>
                    {name}
                </Typography>

                <Box mt={1}>
                    <TextLink
                        text={artists[0].name}
                        href={`/artists/${artists[0].id}`}
                        TypographyProps={{
                            variant: 'h4',
                        }}
                    />
                </Box>

                <Box mt={1}>
                    <Typography color={'textSecondary'} variant={'caption'}>
                        {metaDataString}
                    </Typography>
                </Box>

                <Box mt={2}>
                    <PlayContextButton primaryColor={primaryColor} uri={uri} />
                </Box>
            </Box>
        </Box>
    );
};

AlbumSummary.propTypes = {
    primaryColor: PropTypes.string,
    album: PropTypes.shape({
        id: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        total_tracks: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                height: PropTypes.number.isRequired,
                width: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
            })
        ).isRequired,
        artists: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default AlbumSummary;
