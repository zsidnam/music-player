import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';

const Snackbar = ({ children }) => {
    return (
        <SnackbarProvider
            variant={'info'}
            preventDuplicate
            autoHideDuration={7500}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            {children}
        </SnackbarProvider>
    );
};

Snackbar.propTypes = {
    children: PropTypes.node,
};

export default Snackbar;
