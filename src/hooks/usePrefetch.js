import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import debounce from 'lodash.debounce';

/**
 * Retrieve an instance of the Apollo Client and return a debounce function
 * for pre-fetching graphQL data.
 *
 * @param {Number} debounceMs number of ms to debounce prefetch requests
 * @returns {Function} debounced prefetch function
 */
export const usePrefetch = (debounceMs = 200) => {
    const client = useApolloClient();

    // Pre-fetching greatly increases the amount of API calls we
    // are making to Spotify, so it may need to be turned off if
    // we are surpassing the allowed API request threshold.
    const allowPrefetch = process.env.NEXT_PUBLIC_ALLOW_PREFETCH;

    const prefetch = (queries) => {
        queries.forEach((query) => {
            client.query(query);
        });
    };

    const debouncedPrefetch = useCallback(debounce(prefetch, debounceMs), []);
    const noOp = () => {};

    return allowPrefetch ? debouncedPrefetch : noOp;
};
