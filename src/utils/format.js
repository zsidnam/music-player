'use strict';

/**
 * Accepts time in milliseconds and returns time string in format mm:ss
 *
 * @param {Number} sec time in sec
 */
export const formatTime = (sec) => {
    if (typeof sec !== 'number' || isNaN(sec) || sec < 0) {
        return '';
    }

    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
