import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { SkeletonClassKey } from '@material-ui/lab';

// Shared colors
const WHITE = '#fff';
const BLACK = '#000';
const OFF_WHITE = '#ececec';
const LIGHT_GREY = '#b3b3b3';
const GREY = '#6b6b6b';
const DARK_GREY = '#2e2e2e';
const NEAR_BLACK = '#131313';
const MIDNIGHT = '#0f0f0f';

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
            secondary: LIGHT_GREY,
        },
        common: {
            white: WHITE,
            offWhite: OFF_WHITE,
            lightGrey: LIGHT_GREY,
            grey: GREY,
            darkGrey: DARK_GREY,
            nearBlack: NEAR_BLACK,
            midnight: MIDNIGHT,
            black: BLACK,
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
            letterSpacing: '-2px',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: '1',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.563rem',
            letterSpacing: '-0.2px',
        },
        h5: {
            fontSize: '1.25rem',
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
            fontSize: '0.813rem',
            fontWeight: 'bold',
            letterSpacing: '2.02px',
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
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1300,
            xl: 1920,
        },
    },
});

// Overrides
theme = {
    ...theme,
    props: {
        MuiInput: {
            disableUnderline: true,
        },
        MuiSkeleton: {
            animation: 'wave',
        },
    },
    overrides: {
        MuiButton: {
            root: {
                padding: theme.spacing(1.5, 4),
            },
            text: {
                padding: theme.spacing(1.5, 4),
            },
            containedPrimary: {
                color: theme.palette.common.white,
            },
            textSecondary: {
                color: theme.palette.common.black,
            },
            outlinedSecondary: {
                color: theme.palette.common.lightGrey,
                borderColor: theme.palette.common.lightGrey,
                '&:hover': {
                    borderColor: theme.palette.common.white,
                    color: theme.palette.common.white,
                },
            },
        },
        MuiInput: {
            root: {
                backgroundColor: theme.palette.common.white,
                color: theme.palette.common.black,
                borderRadius: 500,
                padding: theme.spacing(0, 1.5),
                height: 35,
            },
            disabled: {
                backgroundColor: theme.palette.common.darkGrey,
            },
            focused: {
                boxShadow: `0 0 0 2pt ${theme.palette.primary.main}`,
            },
        },
        MuiDialog: {
            paper: {
                backgroundColor: theme.palette.common.offWhite,
            },
        },
        MuiDialogContent: {
            root: {
                padding: theme.spacing(3),
            },
        },
        MuiDialogActions: {
            root: {
                padding: theme.spacing(1.5),
            },
        },
        MuiDialogContentText: {
            root: {
                color: theme.palette.common.black,
            },
        },
        MuiIconButton: {
            root: {
                padding: 5,
                '&:disabled': {
                    color: theme.palette.common.darkGrey,
                },
            },
            colorSecondary: {
                color: theme.palette.common.lightGrey,
                '&:hover': {
                    backgroundColor: theme.palette.common.darkGrey,
                },
            },
        },
        MuiSlider: {
            rail: {
                backgroundColor: theme.palette.common.darkGrey,
                opacity: 1,
            },
            thumb: {
                backgroundColor: 'transparent',
                '&:focus': {
                    boxShadow: 'none',
                },
                '&:hover': {
                    boxShadow: 'none',
                    backgroundColor: theme.palette.primary.main,
                },
            },
            disabled: {
                backgroundColor: 'transparent',
            },
        },
        MuiPopover: {
            paper: {
                backgroundColor: theme.palette.common.darkGrey,
                padding: theme.spacing(2),
            },
        },
        MuiDivider: {
            root: {
                backgroundColor: theme.palette.common.darkGrey,
            },
        },
        MuiPaper: {
            root: {
                backgroundColor: theme.palette.common.midnight,
            },
        },
        MuiTable: {
            root: {
                backgroundColor: theme.palette.common.black,
            },
        },
        MuiTableCell: {
            head: {
                borderBottom: `1px solid ${theme.palette.common.grey}`,
                padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
            },
            body: {
                borderBottom: `1px solid ${theme.palette.common.darkGrey}`,
                padding: `${theme.spacing(1.25)} ${theme.spacing(2)}`,
            },
        },
        MuiTableRow: {
            root: {
                '-webkit-user-select': 'none',
                '-moz-user-select': 'none',
                '&:hover': {
                    backgroundColor: theme.palette.common.nearBlack,
                },
                '&$selected, &$selected:hover': {
                    backgroundColor: theme.palette.common.darkGrey,
                },
            },
            head: {
                '&:hover': {
                    backgroundColor: 'inherit',
                },
            },
        },
        MuiTableSortLabel: {
            root: {
                '&:hover': {
                    color: 'red',
                },
            },
            active: {
                color: 'red',
            },
        },
    },
};

export default responsiveFontSizes(theme);
