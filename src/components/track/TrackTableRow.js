import { useState } from 'react';
import PropTypes from 'prop-types';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/PauseCircleOutline';
import { Box, TableCell, TableRow, Typography, IconButton, makeStyles } from '@material-ui/core';

import { formatTime } from '../../utils/format';
import { resumePlayback, pausePlayback } from '../../services/spotify-api';

const useStyles = makeStyles((theme) => ({
    dynamicColor: ({ isPlaying, primaryColor }) => ({
        color: isPlaying ? primaryColor : theme.palette.text.primary,
    }),
}));

const TrackTableRow = ({
    track,
    index,
    onSelect,
    onPlay,
    onContextClick,
    isSelected,
    isPlaying,
    primaryColor,
    paused,
}) => {
    const classes = useStyles({ isPlaying, primaryColor });
    const [showControls, setControlsDisplay] = useState(false);
    const { id, track_number, name, duration_ms, artists, album } = track;

    const _playTrack = () => {
        // If switching playback to a new track (vs toggling playback
        // of current track), make request through TrackTable so that
        // we play track as part of correct context
        onPlay(track_number);
    };

    const handleContextClick = (e) => {
        e.preventDefault();

        if (!isSelected) {
            onSelect(e, id, index);
        }

        onContextClick(e.clientX, e.clientY);
    };

    const handleDoubleClick = (e) => {
        e.preventDefault();
        _playTrack();
    };

    const handlePlayToggle = () => {
        if (!isPlaying) {
            _playTrack();
        } else {
            paused ? resumePlayback() : pausePlayback();
        }
    };

    return (
        <TableRow
            selected={isSelected}
            onClick={(e) => onSelect(e, id, index)}
            onMouseEnter={() => setControlsDisplay(true)}
            onMouseLeave={() => setControlsDisplay(false)}
            onContextMenu={handleContextClick}
            onDoubleClick={handleDoubleClick}
        >
            <TableCell padding={'none'} align={'center'} style={{ width: 75, cursor: 'pointer' }}>
                {showControls || isPlaying ? (
                    <IconButton className={classes.dynamicColor} onClick={handlePlayToggle}>
                        {paused || !isPlaying ? <PlayIcon /> : <PauseIcon />}
                    </IconButton>
                ) : (
                    <Box width={35} />
                )}
            </TableCell>

            <TableCell>
                <Typography className={classes.dynamicColor}>{track_number}</Typography>
            </TableCell>

            <TableCell>
                <Typography className={classes.dynamicColor}>{name}</Typography>
            </TableCell>

            <TableCell>
                <Typography className={classes.dynamicColor}>{album}</Typography>
            </TableCell>

            <TableCell>
                <Typography className={classes.dynamicColor}>
                    {artists.map((x) => x.name).join(', ')}
                </Typography>
            </TableCell>

            <TableCell align={'right'}>
                <Typography className={classes.dynamicColor}>
                    {formatTime(duration_ms / 1000)}
                </Typography>
            </TableCell>
        </TableRow>
    );
};

TrackTableRow.propTypes = {
    index: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onContextClick: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    paused: PropTypes.bool.isRequired,
    primaryColor: PropTypes.string,
    track: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        duration_ms: PropTypes.number.isRequired,
        track_number: PropTypes.number,
        uri: PropTypes.string.isRequired,
        album: PropTypes.string.isRequired,
        artists: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ),
    }).isRequired,
};

// NOTE: Looked into memoizing component to cut down unnecessary renders,
// but it ended up barely saving any since the fns passed down from parent
// are very dependent on parent component state.

export default TrackTableRow;
