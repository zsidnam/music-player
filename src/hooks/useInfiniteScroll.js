import { useEffect } from 'react';

const SCROLL_THRESHOLD = 0.95; // % of scroll height

/**
 * Loads data via provided function as user scrolls down to the bottom of a scrollable container.
 *
 * @param {Function} onLoadMore Function to execute once scroll surpasses threshold.
 * @param {Boolean} hasMoreData Flag to tell hook whether more data is available to fetch.
 * @param {String} scrollContainerId Id to of scrollable container to attach listener to.
 */
export const useInfiniteScroll = (onLoadMore, hasMoreData, scrollContainerId) => {
    useEffect(() => {
        function handleScroll(e) {
            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

            if (hasMoreData && scrollTop + clientHeight >= SCROLL_THRESHOLD * scrollHeight) {
                onLoadMore();
            }
        }

        const scrollContainer = document.getElementById(scrollContainerId);
        if (!scrollContainer) {
            console.error('Unable to set scroll listener because scroll container was not found.');
        } else {
            scrollContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            scrollContainer && scrollContainer.removeEventListener('scroll', handleScroll);
        };
        // scrollContainerId should not change across renders
    }, [onLoadMore, hasMoreData]);
};
