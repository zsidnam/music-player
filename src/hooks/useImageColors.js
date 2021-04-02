import { usePalette } from 'react-palette';
import { useTheme } from '@material-ui/core';

/**
 * Get colors associated with image.
 * @param {String} imgSrc Url of image to grab colors from.
 */
export const useImageColors = (imgSrc) => {
    const theme = useTheme();
    const { data, loading, error } = usePalette(imgSrc);

    if (loading) {
        return {
            primaryDarkColor: 'inherit',
            primaryLightColor: 'inherit',
        };
    }

    if (!data || error) {
        return {
            primaryDarkColor: theme.palette.common.darkGrey,
            primaryLightColor: theme.palette.primary.main,
        };
    }

    return {
        primaryDarkColor: data.darkVibrant,
        primaryLightColor: data.lightVibrant,
    };
};
