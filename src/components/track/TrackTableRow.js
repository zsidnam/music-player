import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    TableCell,
    TableRow,
    Typography,
    IconButton,
    makeStyles,
} from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/PauseCircleOutline';

import TrackContextMenu from '../contextMenu/TrackContextMenu';
import { formatTime } from '../../utils/format';
import { useMenuContext } from '../../context/menuContext';

// TODO: Remove this
import dummyData from '../../../album-dummy-data.json';
const albumName = dummyData.name;
const artists = dummyData.artists;

const useStyles = makeStyles((theme) => ({
    dynamicColor: ({ isPlaying, primaryColor }) => ({
        color: isPlaying ? primaryColor : theme.palette.text.primary,
    }),
}));

const TrackTableRow = ({
    track,
    index,
    onSelect,
    isSelected,
    isPlaying,
    primaryColor,
}) => {
    const classes = useStyles({ isPlaying, primaryColor });
    const [showControls, setControlsDisplay] = useState(false);
    const { open, close, isOpen } = useMenuContext();

    const { id, track_number, name, duration_ms } = track;

    const handleContextClick = (e) => {
        e.preventDefault();
        onSelect(e, id, index);
        isOpen ? close() : open(e.clientX, e.clientY, TrackContextMenu, {});
    };

    return (
        <TableRow
            selected={isSelected}
            onClick={(e) => onSelect(e, id, index)}
            onMouseEnter={() => setControlsDisplay(true)}
            onMouseLeave={() => setControlsDisplay(false)}
            onContextMenu={handleContextClick}
        >
            <TableCell
                padding={'none'}
                align={'center'}
                style={{ width: 75, cursor: 'pointer' }}
            >
                {showControls || isPlaying ? (
                    <IconButton className={classes.dynamicColor}>
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
                    {albumName}
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
    primaryColor: PropTypes.string,
};

export default TrackTableRow;
