import { green } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// Special exports
export const HEADER_COLOR = 'rgba(28, 28, 28, 0.7)';
export const PLAYER_COLOR = '#131313';
export const CONTENT_PADDING = 20; // spacing units

// Shared colors
const WHITE = '#fff';
const BLACK = '#000';
const DARK_GREY = '#2E2E2E';

// Constants
let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#11B3F3',
        },
        background: {
            default: BLACK,
        },
        text: {
            primary: WHITE,
        },
        common: {
            white: WHITE,
            black: BLACK,
            darkGrey: DARK_GREY,
        },
    },
    typography: {
        htmlFontSize: 16,
        fontFamily: 'Nunito, sans-serif',
        h1: {
            fontSize: '3.052rem',
            letterSpacing: '6px',
        },
        h2: {
            fontSize: '2.441rem',
            letterSpacing: '-0.2px',
        },
        h3: {
            fontSize: '1.953rem',
            letterSpacing: '-0.2px',
        },
        h4: {
            fontSize: '1.563rem',
            letterSpacing: '-0.2px',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            letterSpacing: '-0.3px',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 'bold',
        },
        subtitle1: {
            fontSize: '1.25rem',
            letterSpacing: '0.11px',
        },
        subtitle2: {
            fontSize: '0.75rem',
        },
        overline: {
            fontSize: '0.688rem',
            fontWeight: 'bold',
            letterSpacing: '1.02px',
            textTransform: 'uppercase',
        },
        body1: {
            fontSize: '1rem',
            letterSpacing: '0.09px',
        },
        caption: {
            fontSize: '0.813rem',
            letterSpacing: '0.2px',
        },
        body2: {
            fontSize: '0.813rem',
            fontWeight: 500,
            letterSpacing: 'normal',
        },
        button: {
            fontSize: '0.875rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
    },
    shape: {
        borderRadius: 8,
    },
    spacing: (x) => `${0.5 * x}rem`,
});

// Overrides
theme = {
    ...theme,
    props: {},
    overrides: {
        MuiButton: {
            root: {
                padding: '0.75rem 2rem',
            },
            containedPrimary: {
                color: theme.palette.common.white,
            },
        },
    },
};

export default responsiveFontSizes(theme);
