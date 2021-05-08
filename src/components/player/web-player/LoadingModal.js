import React from 'react';
import PropTypes from 'prop-types';
import { Box, Dialog, DialogContent, DialogContentText, CircularProgress } from '@material-ui/core';

const LoadingModal = ({ open, onClose }) => (
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby={'playback-transfer-modal'}
        maxWidth={'xs'}
        fullWidth
    >
        <DialogContent>
            <DialogContentText align={'center'}>Loading Spotify Web Player...</DialogContentText>
            <Box my={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <CircularProgress />
            </Box>
        </DialogContent>
    </Dialog>
);

LoadingModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LoadingModal;
