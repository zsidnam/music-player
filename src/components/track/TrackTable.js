import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import { useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableContainer,
} from '@material-ui/core';

import TrackTableRow from './TrackTableRow';
import TrackTableHead from './TrackTableHead';
import { getMultipleTrackSelection } from './helpers';
import { useOutsideClick } from '../../hooks/useOutsideClick';

// TODO: Remove
import dummyData from '../../../album-dummy-data.json';
const dummyTracks = dummyData.tracks.items;

const TrackTable = ({ allowSorting }) => {
    const [tracks] = useState(dummyTracks);
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
        <Box mt={10}>
            <Paper>
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
                                    isSelected={selectedTracks.includes(
                                        track.id
                                    )}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

TrackTable.propTypes = {
    allowSorting: PropTypes.bool,
};

export default TrackTable;
