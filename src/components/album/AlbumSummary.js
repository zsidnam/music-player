import PropTypes from 'prop-types';
import { Box, Typography, IconButton, makeStyles } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    iconButton: {
        color: theme.palette.common.black,
        width: '4rem',
        height: '4rem',
    },
    icon: {
        fontSize: '2rem',
    },
    titleText: {
        fontSize: '3.5rem',
        fontWeight: 500,
    },
}));

const AlbumSummary = ({ album, primaryColor }) => {
    const classes = useStyles();

    const { artists, name, release_date, total_tracks, images } = album;

    // TODO: Remove dummy data
    const paused = false;

    const metaDataString = `${moment(release_date).format(
        'MMM YYYY'
    )}, ${total_tracks} songs`;

    const albumArtImgSrc = images.length && images[0].url;

    return (
        <Box display={'flex'}>
            <img src={albumArtImgSrc} style={{ maxWidth: 300 }} />

            <Box ml={4} mt={5}>
                <Typography variant={'h2'} className={classes.titleText}>
                    {name}
                </Typography>

                <Typography variant={'h4'}>{artists[0].name}</Typography>

                <Box mt={1}>
                    <Typography variant={'caption'}>
                        {metaDataString}
                    </Typography>
                </Box>

                <Box mt={2}>
                    <IconButton
                        className={classes.iconButton}
                        style={{ backgroundColor: primaryColor }}
                    >
                        {paused ? (
                            <PlayIcon className={classes.icon} />
                        ) : (
                            <PauseIcon className={classes.icon} />
                        )}
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

AlbumSummary.propTypes = {
    primaryColor: PropTypes.string,
    album: PropTypes.shape({
        id: PropTypes.string.isRequired,
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