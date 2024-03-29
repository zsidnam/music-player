import { useState } from 'react';
import PropTypes from 'prop-types';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/PauseCircleOutline';
import { Box, TableCell, TableRow, Typography, IconButton, makeStyles } from '@material-ui/core';
import _get from 'lodash.get';
import clsx from 'clsx';

import { COLUMNS } from './TrackTable';
import { formatTime } from '../../utils/format';
import { resumePlayback, pausePlayback } from '../../services/spotify-api';
import ArtistLinks from '../artist/ArtistLinks';
import {
    ARTIST_QUERY,
    RELATED_ARTISTS_QUERY,
    TOP_TRACKS_QUERY,
} from '../../graphql/queries/artist';

const useStyles = makeStyles((theme) => ({
    dynamicColor: ({ isPlaying, primaryColor }) => ({
        color: isPlaying ? primaryColor : theme.palette.text.primary,
        '&:hover': {
            color: isPlaying ? primaryColor : theme.palette.text.primary,
        },
    }),
    iconButton: {
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
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
    columns,
    prefetch,
    indexAsTrackNumber,
}) => {
    const classes = useStyles({ isPlaying, primaryColor });
    const [showControls, setControlsDisplay] = useState(false);
    const { uri, id, track_number, name, duration_ms, artists, album } = track;

    const _hasColumn = (colName) => columns.includes(colName);

    const _playTrack = () => {
        // If switching playback to a new track (vs toggling playback
        // of current track), make request through TrackTable so that
        // we play track as part of correct context
        onPlay(indexAsTrackNumber ? index : track_number, uri);
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

    const handleArtistMouseOver = (artistId) => {
        prefetch([
            {
                query: ARTIST_QUERY,
                variables: { id: artistId },
            },
            {
                query: RELATED_ARTISTS_QUERY,
                variables: { artistId },
            },
            {
                query: TOP_TRACKS_QUERY,
                variables: { artistId },
            },
        ]);
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
            <TableCell padding={'none'} align={'center'} style={{ width: 50, cursor: 'pointer' }}>
                {showControls || isPlaying ? (
                    <IconButton
                        className={clsx(classes.dynamicColor, classes.iconButton)}
                        onClick={handlePlayToggle}
                    >
                        {paused || !isPlaying ? <PlayIcon /> : <PauseIcon />}
                    </IconButton>
                ) : (
                    <Box width={35} />
                )}
            </TableCell>

            {_hasColumn(COLUMNS.TRACK_NUMBER) && (
                <TableCell align={'center'}>
                    <Typography className={classes.dynamicColor}>
                        {indexAsTrackNumber ? index + 1 : track_number}
                    </Typography>
                </TableCell>
            )}

            {_hasColumn(COLUMNS.ALBUM_ART) && (
                <TableCell padding={'none'} align={'center'} style={{ paddingTop: '4px' }}>
                    <img src={_get(album, 'images[2].url')} height={33} />
                </TableCell>
            )}

            {_hasColumn(COLUMNS.TITLE) && (
                <TableCell>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
                        <Typography variant={'h6'} className={classes.dynamicColor}>
                            {name}
                        </Typography>

                        {_hasColumn(COLUMNS.ARTISTS) && (
                            <ArtistLinks
                                artists={artists}
                                onMouseOver={handleArtistMouseOver}
                                className={classes.dynamicColor}
                                TypographyProps={{
                                    variant: 'caption',
                                }}
                            />
                        )}
                    </Box>
                </TableCell>
            )}

            {_hasColumn(COLUMNS.ALBUM) && (
                <TableCell>
                    <Typography className={classes.dynamicColor}>{album.name}</Typography>
                </TableCell>
            )}

            {_hasColumn(COLUMNS.TIME) && (
                <TableCell align={'right'}>
                    <Typography className={classes.dynamicColor}>
                        {formatTime(duration_ms / 1000)}
                    </Typography>
                </TableCell>
            )}
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
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    indexAsTrackNumber: PropTypes.bool,
    prefetch: PropTypes.func.isRequired,
    track: PropTypes.shape({
        id: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired,
        name: PropTypes.string,
        duration_ms: PropTypes.number,
        track_number: PropTypes.number,
        album: PropTypes.shape({
            name: PropTypes.string,
            images: PropTypes.arrayOf(
                PropTypes.shape({
                    width: PropTypes.number,
                    height: PropTypes.number,
                    url: PropTypes.string,
                })
            ),
        }),
        artists: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string,
            })
        ),
    }).isRequired,
};

// NOTE: Looked into memoizing component to cut down unnecessary renders,
// but it ended up barely saving any since the fns passed down from parent
// are very dependent on parent component state.

export default TrackTableRow;
