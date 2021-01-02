import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// Constants
let theme = createMuiTheme({
    palette: {
        background: {
            default: 'black',
        },
    },
    typography: {},
});

// Overrides
theme = {
    ...theme,
    props: {},
    overrides: {},
};

export default responsiveFontSizes(theme);
