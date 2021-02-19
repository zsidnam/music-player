import { useState } from 'react';
import PropTypes from 'prop-types';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/PauseCircleOutline';
import {
    Box,
    TableCell,
    TableRow,
    Typography,
    IconButton,
    makeStyles,
} from '@material-ui/core';

import TrackContextMenu from '../contextMenu/TrackContextMenu';
import { formatTime } from '../../utils/format';
import { useMenuContext } from '../../context/menuContext';

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
    isSelected,
    isPlaying,
    primaryColor,
}) => {
    const classes = useStyles({ isPlaying, primaryColor });
    const [showControls, setControlsDisplay] = useState(false);
    const { open, close, isOpen } = useMenuContext();
    const { id, track_number, name, duration_ms, artists, album } = track;

    const playTrack = () => {
        onPlay(track_number);
    };

    const handleContextClick = (e) => {
        e.preventDefault();
        onSelect(e, id, index);
        isOpen ? close() : open(e.clientX, e.clientY, TrackContextMenu, {});
    };

    const handleDoubleClick = (e) => {
        e.preventDefault();
        playTrack();
    };

    const handlePlayToggle = (e) => {
        e.preventDefault();
        alert('coming soon!');
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
            <TableCell
                padding={'none'}
                align={'center'}
                style={{ width: 75, cursor: 'pointer' }}
            >
                {showControls || isPlaying ? (
                    <IconButton
                        className={classes.dynamicColor}
                        onClick={handlePlayToggle}
                    >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </IconButton>
                ) : (
                    <Box width={35} />
                )}
            </TableCell>

            <TableCell>
                <Typography className={classes.dynamicColor}>
                    {track_number}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography className={classes.dynamicColor}>{name}</Typography>
            </TableCell>

            <TableCell>
                <Typography className={classes.dynamicColor}>
                    {album}
                </Typography>
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
    isPlaying: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
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

export default TrackTableRow;
