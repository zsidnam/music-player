import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import { useState } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';

import TrackTableRow from './TrackTableRow';
import TrackTableHead from './TrackTableHead';
import { getMultipleTrackSelection } from './helpers';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const TrackTable = ({ tracks, allowSorting, primaryColor }) => {
    const [selectedTracks, setSelectedTracks] = useState([]);

    const unSelectTracks = () => {
        setSelectedTracks([]);
    };

    // Unselect tracks if user clicks outside of table
    const tableRef = useOutsideClick(unSelectTracks);

    const handleTrackSelect = (e, trackId, trackIndex) => {
        e.preventDefault();
        const modifierKeys = pick(e, ['shiftKey', 'metaKey']);

        let newSelectionList;
        if (modifierKeys.shiftKey) {
            // select multiple tracks
            newSelectionList = getMultipleTrackSelection(
                tracks,
                selectedTracks,
                trackIndex
            );
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
                            // TODO: Remove this hard coding
                            isPlaying={idx === 4}
                            isSelected={selectedTracks.includes(track.id)}
                            primaryColor={primaryColor}
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
    tracks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            duration_ms: PropTypes.number.isRequired,
            track_number: PropTypes.number.isRequired,
            artists: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                })
            ),
        })
    ),
};

export default TrackTable;
