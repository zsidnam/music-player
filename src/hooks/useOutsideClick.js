import { useEffect, useRef } from 'react';

/**
 * Takes in a function to execute when the user clicks outside of a given element and
 * returns a ref. The consumer should give the returned ref a container element, and the provided
 * function will be executed any time the user clicks outside of that container.
 *
 * Note: Provided function should not be dynamic. (Changes after first hook run will be ignored)
 *
 * @param {Function} onOutsideClick Function to execute if click is performed outside defining container
 * @param {Boolean} isLocked Flag to prevent outsideClick behavior if certain condition is met
 */
export const useOutsideClick = (onOutsideClick, isLocked) => {
    const containerRef = useRef();

    useEffect(() => {
        function handleClick(e) {
            if (!containerRef.current.contains(e.target) && !isLocked) {
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

    return containerRef;
};
