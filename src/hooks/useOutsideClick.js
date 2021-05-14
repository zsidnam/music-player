import { useEffect } from 'react';

/**
 * Executes the provided function any time the user clicks outside of the container element
 * assigned to the provided ref.
 *
 * Note: Provided function should not be dynamic. (Changes after first hook run will be ignored)
 *
 * @param {Object} containerRef Ref assigned to container element
 * @param {Function} onOutsideClick Function to execute if click is performed outside defining container
 * @param {Boolean} isLocked Flag to prevent outsideClick behavior if certain condition is met
 */
export const useOutsideClick = (containerRef, onOutsideClick, isLocked) => {
    useEffect(() => {
        function handleClick(e) {
            if (!containerRef?.current?.contains(e.target) && !isLocked) {
                onOutsideClick();
            }
        }

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
        // onOutsideClick function should not ever be changed.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLocked]);
};
