import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import { usePlayStateContext } from '../../context/playStateContext';
import { playContext, pausePlayback, resumePlayback } from '../../services/spotify-api';

const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.common.black,
        backgroundColor: ({ primaryColor }) => primaryColor || theme.palette.primary.main,
        width: ({ size }) => size,
        height: ({ size }) => size,
        '&:hover': {
            backgroundColor: ({ primaryColor }) => primaryColor || theme.palette.primary.main,
            transform: 'scale(1.1)',
            color: theme.palette.common.white,
        },
    },
}));

const PlayContextButton = ({ primaryColor, uri, size }) => {
    const classes = useStyles({ primaryColor, size });
    const {
        playState: { paused, contextUri },
    } = usePlayStateContext();

    const isCurrentContext = contextUri == uri;

    const handlePlayToggle = () => {
        if (isCurrentContext) {
            paused ? resumePlayback() : pausePlayback();
        } else {
            playContext(uri);
        }
    };

    return (
        <IconButton className={classes.button} onClick={handlePlayToggle}>
            {paused || !isCurrentContext ? (
                <PlayIcon className={classes.icon} />
            ) : (
                <PauseIcon className={classes.icon} />
            )}
        </IconButton>
    );
};

PlayContextButton.defaultProps = {
    size: '3rem',
};

PlayContextButton.propTypes = {
    primaryColor: PropTypes.string,
    uri: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PlayContextButton;
