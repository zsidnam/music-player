import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableContainer } from '@material-ui/core';

import TrackTableRow from './TrackTableRow';
import TrackTableHead from './TrackTableHead';
import TrackContextMenu from '../contextMenu/TrackContextMenu';
import { useRecordSelect } from '../../hooks/useRecordSelect';
import { usePlayStateContext } from '../../context/playStateContext';
import { useMenuContext } from '../../context/menuContext';

export const COLUMNS = Object.freeze({
    ALBUM_ART: 'albumArt',
    TRACK_NUMBER: 'trackNumber',
    TITLE: 'title',
    ALBUM: 'album',
    ARTISTS: 'artists',
    TIME: 'time',
});

const TrackTable = ({
    tracks,
    allowSorting,
    primaryColor,
    contextUri,
    columns,
    indexAsTrackNumber,
    disableTableHead,
    onTrackPlay,
}) => {
    const tableRef = useRef();
    const { selectedRecords, handleRecordSelect } = useRecordSelect(tracks, tableRef);
    const { open } = useMenuContext();
    const { playState } = usePlayStateContext();
    const { playingUri, paused, contextUri: playingContextUri } = playState;

    const handleContextMenuClick = (mouseX, mouseY) => {
        open(mouseX, mouseY, TrackContextMenu, {});
    };

    // Some use cases (eg Top Tracks) don't have a context uri that can be used.
    // In those cases, we want to display a track as "playing" if the track uri
    // matches regardless of what the context is.
    const isTrackPlaying = (trackUri) =>
        contextUri
            ? contextUri === playingContextUri && trackUri === playingUri
            : trackUri === playingUri;

    return (
        <TableContainer ref={tableRef}>
            <Table>
                {!disableTableHead && (
                    <TrackTableHead allowSorting={allowSorting} columns={columns} />
                )}

                <TableBody>
                    {tracks.map((track, idx) => (
                        <TrackTableRow
                            key={track.id}
                            track={track}
                            index={idx}
                            columns={columns}
                            onSelect={handleRecordSelect}
                            onPlay={onTrackPlay}
                            isPlaying={isTrackPlaying(track.uri)}
                            isSelected={selectedRecords.includes(track.id)}
                            primaryColor={primaryColor}
                            paused={paused}
                            onContextClick={handleContextMenuClick}
                            indexAsTrackNumber={indexAsTrackNumber}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

TrackTable.defaultProps = {
    columns: [COLUMNS.TRACK_NUMBER, COLUMNS.TITLE],
};

TrackTable.propTypes = {
    allowSorting: PropTypes.bool,
    primaryColor: PropTypes.string,
    contextUri: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    indexAsTrackNumber: PropTypes.bool,
    disableTableHead: PropTypes.bool,
    onTrackPlay: PropTypes.func.isRequired,
    tracks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            uri: PropTypes.string.isRequired,
            name: PropTypes.string,
            duration_ms: PropTypes.number,
            track_number: PropTypes.number,
            album: PropTypes.shape({
                name: PropTypes.string,
            }),
            artists: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string,
                    name: PropTypes.string,
                })
            ),
        })
    ).isRequired,
};

export default TrackTable;
