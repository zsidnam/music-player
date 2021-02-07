import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    TableCell,
    TableRow,
    Typography,
    IconButton,
} from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/PauseCircleOutline';

import { formatTime } from '../../utils/format';
import { useMenuContext } from '../../context/menuContext';

// TODO: Remove this
import dummyData from '../../../album-dummy-data.json';
const albumName = dummyData.name;
const artists = dummyData.artists;

const TrackTableRow = ({ track, index, onSelect, isSelected, isPlaying }) => {
    const [showControls, setControlsDisplay] = useState(false);
    const { open, close, isOpen } = useMenuContext();
    const { id, track_number, name, duration_ms } = track;

    const handleContextClick = (e) => {
        e.preventDefault();
        isOpen ? close() : open(e.clientX, e.clientY, []);
    };

    return (
        <TableRow
            onClick={(e) => onSelect(e, id, index)}
            selected={isSelected}
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
                    <IconButton color={isPlaying ? 'primary' : 'inherit'}>
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </IconButton>
                ) : (
                    <Box width={35} />
                )}
            </TableCell>

            <TableCell>
                <Typography
                    color={isPlaying ? 'primary' : 'textPrimary'}
                    variant={'body2'}
                >
                    {track_number}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography
                    color={isPlaying ? 'primary' : 'textPrimary'}
                    variant={'body2'}
                >
                    {name}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography
                    color={isPlaying ? 'primary' : 'textPrimary'}
                    variant={'body2'}
                >
                    {albumName}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography
                    color={isPlaying ? 'primary' : 'textPrimary'}
                    variant={'body2'}
                >
                    {artists.map((x) => x.name).join(', ')}
                </Typography>
            </TableCell>

            <TableCell align={'right'}>
                <Typography
                    color={isPlaying ? 'primary' : 'textPrimary'}
                    variant={'body2'}
                >
                    {formatTime(duration_ms / 1000)}
                </Typography>
            </TableCell>
        </TableRow>
    );
};

TrackTableRow.propTypes = {};

export default TrackTableRow;
