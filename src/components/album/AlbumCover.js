import PropTypes from 'prop-types';
import { Box, Typography, makeStyles } from '@material-ui/core';
import moment from 'moment';

import SafeLink from '../common/SafeLink';
import TextLink from '../common/TextLink';

const useStyles = makeStyles((theme) => ({
    image: {
        cursor: 'pointer',
        '&:hover': {
            filter: 'brightness(0.4)',
        },
    },
}));

const AlbumCover = ({ album }) => {
    const classes = useStyles();
    const { id, name, release_date, images } = album;
    const albumImgSrc = images.length && images[1].url;

    return (
        <Box>
            <Box mb={1}>
                <SafeLink href={`/albums/${id}`}>
                    <img className={classes.image} src={albumImgSrc} style={{ width: '100%' }} />
                </SafeLink>
            </Box>

            <TextLink href={`/albums/${id}`} text={name} />

            <Typography variant={'caption'} color={'textSecondary'}>
                {moment(release_date).format('YYYY')}
            </Typography>
        </Box>
    );
};

AlbumCover.propTypes = {
    album: PropTypes.shape({
        id: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        release_date_precision: PropTypes.string.isRequired,
        album_group: PropTypes.string.isRequired,
        album_type: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                width: PropTypes.number.isRequired,
                height: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default AlbumCover;
