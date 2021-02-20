import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Context used to share small subset of player state information with
 * other parts of the application.
 */

export const PlayStateContext = createContext({});

const initialState = {
    contextUri: null,
    playingUri: null,
    paused: false,
};

export const PlayStateContextProvider = ({ children }) => {
    const [playState, setPlayState] = useState(initialState);

    const store = {
        playState,
        setPlayState,
    };

    return (
        <PlayStateContext.Provider value={store}>
            {children}
        </PlayStateContext.Provider>
    );
};

PlayStateContextProvider.propTypes = {
    children: PropTypes.node,
};

export const usePlayStateContext = () => useContext(PlayStateContext);
