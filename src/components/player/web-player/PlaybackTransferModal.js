import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@material-ui/core';

const PlaybackTransferModal = ({ open, onClose, transferPlayback }) => {
    const handleConfirm = async (e) => {
        e.preventDefault();
        transferPlayback();
        onClose();
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby={'playback-transfer-modal'}
        >
            <DialogContent>
                <DialogContentText>
                    This app uses the Spotify Web Playback SDK to play songs. In
                    order to control playback, please transfer playback to this
                    app by clicking the button below or by selecting &quot;Web
                    Playback SDK Quick Player&quot; from the devices menu.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant={'text'}
                    color={'secondary'}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    variant={'contained'}
                    color={'primary'}
                    onClick={handleConfirm}
                >
                    Use Web Player
                </Button>
            </DialogActions>
        </Dialog>
    );
};

PlaybackTransferModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    transferPlayback: PropTypes.func.isRequired,
};

export default PlaybackTransferModal;
