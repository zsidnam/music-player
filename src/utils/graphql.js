import omit from 'lodash.omit';

/**
 * Builds and returns a merge function to be used in an Apollo Client type policy.
 * Used to merge old and new items of a paged collection.
 *
 * @param {String} itemsPropName prop name of items collection to be reconciled
 * @returns merge function for apollo client type policy
 */
export const buildMergePageItemsById = (itemsPropName = 'items') =>
    function merge(existing, incoming, { readField, mergeObjects }) {
        const mergedItems = existing?.[itemsPropName] ? existing[itemsPropName].slice() : [];
        const newPageMetadata = omit(incoming, [itemsPropName]);
        const itemIdToIndex = {};

        if (existing) {
            existing[itemsPropName].forEach((item, index) => {
                const id = readField('id', item);
                itemIdToIndex[id] = index;
            });
        }

        incoming[itemsPropName].forEach((item) => {
            const id = readField('id', item);
            const existingIndex = itemIdToIndex[id];
            if (typeof existingIndex === 'number') {
                mergedItems[existingIndex] = mergeObjects(mergedItems[existingIndex], item);
            } else {
                itemIdToIndex[id] = mergedItems.length;
                mergedItems.push(item);
            }
        });

        return {
            ...newPageMetadata,
            items: mergedItems,
        };
    };
