import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import { useState } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';

import TrackTableRow from './TrackTableRow';
import TrackTableHead from './TrackTableHead';
import TrackContextMenu from '../contextMenu/TrackContextMenu';
import { getMultipleTrackSelection } from './helpers';
import { useOutsideClick } from '../../hooks/useOutsideClick';
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
    const [selectedTracks, setSelectedTracks] = useState([]);
    const { open, isOpen } = useMenuContext();
    const {
        playState: { playingUri, paused },
    } = usePlayStateContext();

    // Unselect tracks if user clicks outside of table (as long as context
    // menu is not open).
    const unSelectTracks = () => setSelectedTracks([]);
    const tableRef = useOutsideClick(unSelectTracks, isOpen);

    const handleTrackSelect = (e, trackId, trackIndex) => {
        e.preventDefault();
        const modifierKeys = pick(e, ['shiftKey', 'metaKey']);

        let newSelectionList;
        if (modifierKeys.shiftKey) {
            // select multiple tracks
            newSelectionList = getMultipleTrackSelection(tracks, selectedTracks, trackIndex);
        } else if (modifierKeys.metaKey) {
            // toggle selection of single track
            const alreadySelected = selectedTracks.indexOf(trackId) >= 0;
            newSelectionList = alreadySelected
                ? selectedTracks.filter((id) => id !== trackId)
                : [...selectedTracks, trackId];
        } else {
            // select single track
            newSelectionList = [trackId];
        }

        setSelectedTracks([...new Set(newSelectionList)]);
    };

    const handleContextMenuClick = (mouseX, mouseY) => {
        open(mouseX, mouseY, TrackContextMenu, {});
    };

    const handleTrackPlay = async (trackNumber, uri) => {
        // TODO: Figure out how to play top tracks correctly
        trackNumber ? playContext(contextUri, trackNumber) : playTracks([uri], contextUri);
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
                            onSelect={handleTrackSelect}
                            onPlay={handleTrackPlay}
                            isPlaying={track.uri === playingUri}
                            isSelected={selectedTracks.includes(track.id)}
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
