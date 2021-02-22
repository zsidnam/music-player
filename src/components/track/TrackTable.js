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
import { playContext } from '../../services/spotify-api';

const TrackTable = ({ tracks, allowSorting, primaryColor, contextUri }) => {
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

    const handleTrackPlay = async (trackNumber) => {
        playContext(contextUri, trackNumber);
    };

    return (
        <TableContainer ref={tableRef}>
            <Table>
                <TrackTableHead allowSorting={allowSorting} />
                <TableBody>
                    {tracks.map((track, idx) => (
                        <TrackTableRow
                            key={track.id}
                            track={track}
                            index={idx}
                            onSelect={handleTrackSelect}
                            onPlay={handleTrackPlay}
                            isPlaying={track.uri === playingUri}
                            isSelected={selectedTracks.includes(track.id)}
                            primaryColor={primaryColor}
                            paused={paused}
                            onContextClick={handleContextMenuClick}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

TrackTable.propTypes = {
    allowSorting: PropTypes.bool,
    primaryColor: PropTypes.string,
    contextUri: PropTypes.string.isRequired,
    tracks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            duration_ms: PropTypes.number.isRequired,
            track_number: PropTypes.number.isRequired,
            uri: PropTypes.string.isRequired,
            album: PropTypes.string.isRequired,
            artists: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                })
            ),
        })
    ).isRequired,
};

export default TrackTable;
