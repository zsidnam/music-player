'use strict';

export const getMultipleTrackSelection = (
    trackList,
    currentlySelectedTracks,
    newlySelectedTrackIndex
) => {
    const trackIds = trackList.map((track) => track.id);

    // If no tracks were previously selected, assume that all tracks up
    // to and including selected track index should be selected
    if (!currentlySelectedTracks.length) {
        return trackIds.filter((_, idx) => idx <= newlySelectedTrackIndex);
    }

    const trackIdMap = trackIds.reduce((acc, trackId, idx) => {
        acc[trackId] = idx;
        return acc;
    }, {});

    // Whether newly selected track index is before current set or after,
    // make sure current selections remain in selection set.
    const firstSelectedTrackIdx = trackIdMap[currentlySelectedTracks[0]];
    const lastSelectedTrackIdx =
        trackIdMap[currentlySelectedTracks[currentlySelectedTracks.length - 1]];
    const isDownwardShiftDirection =
        newlySelectedTrackIndex >= firstSelectedTrackIdx;

    return isDownwardShiftDirection
        ? trackIds.filter(
              (_, idx) =>
                  firstSelectedTrackIdx <= idx && idx <= newlySelectedTrackIndex
          )
        : trackIds.filter(
              (_, idx) =>
                  newlySelectedTrackIndex <= idx && idx <= lastSelectedTrackIdx
          );
};
