import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Context used for displaying a global context menu for the application.
 */

const MenuContext = createContext({});

const initialState = {
    mouseX: null,
    mouseY: null,
    MenuContent: null,
    menuContentProps: {},
};

export const MenuContextProvider = ({ children }) => {
    const [menuState, setMenuState] = useState(initialState);

    const store = {
        menuState,
        isOpen: menuState.mouseX !== null && menuState.mouseY !== null,
        close: () => {
            setMenuState(initialState);
        },
        open: (mouseX, mouseY, MenuContent, menuContentProps) => {
            setMenuState({
                mouseX,
                mouseY,
                MenuContent,
                menuContentProps,
            });
        },
    };

    return (
        <MenuContext.Provider value={store}>{children}</MenuContext.Provider>
    );
};

MenuContextProvider.propTypes = {
    children: PropTypes.node,
};

export const useMenuContext = () => useContext(MenuContext);
