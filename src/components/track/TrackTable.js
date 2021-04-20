import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableContainer } from '@material-ui/core';

import TrackTableRow from './TrackTableRow';
import TrackTableHead from './TrackTableHead';
import TrackContextMenu from '../contextMenu/TrackContextMenu';
import { useRecordSelect } from '../../hooks/useRecordSelect';
import { usePlayStateContext } from '../../context/playStateContext';
import { useMenuContext } from '../../context/menuContext';
import { playContext, playTracks } from '../../services/spotify-api';

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
}) => {
    const tableRef = useRef();
    const { selectedRecords, handleRecordSelect } = useRecordSelect(tracks, tableRef);
    const { open } = useMenuContext();
    const { playState } = usePlayStateContext();
    const { playingUri, paused, contextUri: playingContextUri } = playState;

    const handleContextMenuClick = (mouseX, mouseY) => {
        open(mouseX, mouseY, TrackContextMenu, {});
    };

    const handleTrackPlay = async (trackNumber, uri) => {
        // TODO: Figure out how to play top tracks correctly
        trackNumber ? playContext(contextUri, trackNumber) : playTracks([uri]);
    };

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
                            onPlay={handleTrackPlay}
                            isPlaying={track.uri === playingUri && contextUri === playingContextUri}
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
    contextUri: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    indexAsTrackNumber: PropTypes.bool,
    disableTableHead: PropTypes.bool,
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
