import { useEffect, useCallback } from 'react';
import { Menu } from '@material-ui/core';

import { useMenuContext } from '../../context/menuContext';

/**
 * Global context menu. When a context menu is needed, the component needing
 * the menu should use the open() fn provided by the menu context, passing in
 * the position coordinates and the content of the context menu.
 */
const ContextMenu = () => {
    const { menuState, isOpen, close } = useMenuContext();
    const { mouseX, mouseY, MenuContent, menuContentProps } = menuState;

    const handleContextMenuClick = useCallback(
        (e) => {
            e.preventDefault();
            if (isOpen) close();
        },
        [close, isOpen]
    );

    // This effect handles closing an open context menu if right click
    // is used again. Opening the menu should be handled by the component
    // that wants to provide a context menu.
    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenuClick);
        return () => document.removeEventListener('contextmenu', handleContextMenuClick);
    }, [handleContextMenuClick]);

    return (
        <Menu
            elevation={16}
            keepMounted
            transitionDuration={0}
            open={isOpen}
            onClose={() => close()}
            anchorReference={'anchorPosition'}
            anchorPosition={isOpen ? { top: mouseY, left: mouseX } : undefined}
        >
            {MenuContent ? <MenuContent {...menuContentProps} /> : null}
        </Menu>
    );
};

export default ContextMenu;
