import { useState } from 'react';
import pick from 'lodash.pick';

import { useOutsideClick } from './useOutsideClick';

const _getFirstRecordToCurrentRecord = (recordIds, firstIdx, currentIdx) =>
    recordIds.filter((_, idx) => firstIdx <= idx && idx <= currentIdx);

const _getCurrentRecordToLastRecord = (recordIds, currentIdx, lastIdx) =>
    recordIds.filter((_, idx) => currentIdx <= idx && idx <= lastIdx);

const _getMultipleRecordSelection = (records, currentlySelectedRecords, newlySelectedRecordIdx) => {
    const recordIds = records.map((record) => record.id);

    // If no records were previously selected, assume that all records up
    // to and including selected record index should be selected
    if (!currentlySelectedRecords.length) {
        return recordIds.filter((_, idx) => idx <= newlySelectedRecordIdx);
    }

    const recordIdMap = recordIds.reduce((acc, recordId, idx) => {
        acc[recordId] = idx;
        return acc;
    }, {});

    // Whether newlySelectedRecordIdx is before current selected set or after,
    // we need to make sure current selections remain in selection set.
    const firstSelectedRecordIdx = recordIdMap[currentlySelectedRecords[0]];
    const lastSelectedRecordIdx =
        recordIdMap[currentlySelectedRecords[currentlySelectedRecords.length - 1]];
    return newlySelectedRecordIdx >= firstSelectedRecordIdx
        ? _getFirstRecordToCurrentRecord(recordIds, firstSelectedRecordIdx, newlySelectedRecordIdx)
        : _getCurrentRecordToLastRecord(recordIds, newlySelectedRecordIdx, lastSelectedRecordIdx);
};

/**
 * Enables record selection for a table. Allows user to select a single record
 * or multiple records by using the shift and cmd key modifiers.
 *
 * @param {Array} records Collection of records available for selection
 * @param {Object} tableRef Ref assigned to table element
 */
export const useRecordSelect = (records, tableRef) => {
    const [selectedRecords, setSelectedRecords] = useState([]);

    // Unselect records if user clicks outside of table
    const unSelectRecords = () => setSelectedRecords([]);
    useOutsideClick(tableRef, unSelectRecords);

    const handleRecordSelect = (event, recordId, recordIndex) => {
        event.preventDefault();
        const modifierKeys = pick(event, ['shiftKey', 'metaKey']);

        let newSelectionList;
        if (modifierKeys.shiftKey) {
            // select multiple tracks
            newSelectionList = _getMultipleRecordSelection(records, selectedRecords, recordIndex);
        } else if (modifierKeys.metaKey) {
            // toggle selection of single track
            const alreadySelected = selectedRecords.indexOf(recordId) >= 0;
            newSelectionList = alreadySelected
                ? selectedRecords.filter((id) => id !== recordId)
                : [...selectedRecords, recordId];
        } else {
            // select single track (clearing all other selections)
            newSelectionList = [recordId];
        }

        setSelectedRecords([...new Set(newSelectionList)]);
    };

    return {
        selectedRecords,
        handleRecordSelect,
    };
};
