import { Box, Typography, IconButton, makeStyles } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import moment from 'moment';

import dummyData from '../../../album-dummy-data.json';

const useStyles = makeStyles((theme) => ({
    togglePlayIcon: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        width: '4rem',
        height: '4rem',
    },
    titleText: {
        fontSize: '3.5rem',
        fontWeight: 500,
    },
}));

// TODO: Clean this the heck up

const albumArtImgSrc = dummyData.images[0].url;

const AlbumSummary = () => {
    const classes = useStyles();
    const paused = false;

    const album = dummyData;
    const { artists, name, release_date, total_tracks } = album;

    const metaDataString = `${moment(release_date).format(
        'MMM YYYY'
    )}, ${total_tracks} songs`;

    return (
        <Box display={'flex'} justifyContent={'center'}>
            <img src={albumArtImgSrc} style={{ maxWidth: 400 }} />

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
                    {paused ? (
                        <IconButton color={'primary'}>
                            <PauseIcon />
                        </IconButton>
                    ) : (
                        <IconButton className={classes.togglePlayIcon}>
                            <PlayIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AlbumSummary;
