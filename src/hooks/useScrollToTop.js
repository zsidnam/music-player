import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { SCROLLABLE_CONTENT_CONTAINER_ID } from '../utils/constants';

/**
 * Scrolls to top of main scroll container each time a route changes. This
 * is used for pages like artist/[id] when changing the id.
 */
export const useScrollToTop = () => {
    const router = useRouter();
    useEffect(() => {
        function scrollToTContainerTop() {
            const scrollableContainer = document.getElementById(SCROLLABLE_CONTENT_CONTAINER_ID);
            if (scrollableContainer) {
                scrollableContainer.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            }
        }

        router.events.on('routeChangeStart', scrollToTContainerTop);

        return () => {
            router.events.off('routeChangeStart', scrollToTContainerTop);
        };
    }, []);
};
