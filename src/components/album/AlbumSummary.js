import PropTypes from 'prop-types';
import { Box, Typography, IconButton, makeStyles } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import moment from 'moment';

// TODO: Remove this
import dummyData from '../../../album-dummy-data.json';
//const albumArtImgSrc = dummyData.images[0].url;
const albumArtImgSrc =
    'https://i.scdn.co/image/ab67616d00001e0273e509d7beb066e9746946d2';

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

const AlbumSummary = ({ primaryColor }) => {
    const classes = useStyles();

    // TODO: Remove dummy data
    const album = dummyData;
    const paused = false;
    const { artists, name, release_date, total_tracks } = album;

    const metaDataString = `${moment(release_date).format(
        'MMM YYYY'
    )}, ${total_tracks} songs`;

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
};

export default AlbumSummary;
