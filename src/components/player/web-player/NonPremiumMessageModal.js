import PropTypes from 'prop-types';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    Button,
} from '@material-ui/core';

const NonPremiumMessageModal = ({ open, onClose }) => (
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby={'non-premium-message-modal'}
        maxWidth={'sm'}
        fullWidth
    >
        <DialogContent>
            <DialogTitle>Non-Premium Account</DialogTitle>
            <DialogContentText align={'left'}>
                It looks like you are using the free version of Spotify. Without a Premium account,
                you will not be able to use the in-browser Web Player or control music playback.
                However, you will still be able to navigate around the website and explore the
                Spotify library.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant={'contained'} color={'primary'} onClick={onClose}>
                Acknowledge
            </Button>
        </DialogActions>
    </Dialog>
);

NonPremiumMessageModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default NonPremiumMessageModal;
