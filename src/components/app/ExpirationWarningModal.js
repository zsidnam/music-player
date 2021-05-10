import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
} from '@material-ui/core';
import moment from 'moment';

import { useAuthContext } from '../../context/authContext';

const CHECK_INTERVAL_SEC = 60;
const WARNING_THRESHOLD_MIN = 5; // min before expiration
const LOGOUT_THRESHOLD_MIN = 1; // min before expiration

const _shouldWarnUser = (expirationDate) =>
    moment(expirationDate).subtract(WARNING_THRESHOLD_MIN, 'minutes').isBefore(moment());

const _shouldLogoutUser = (expirationDate) =>
    moment(expirationDate).subtract(LOGOUT_THRESHOLD_MIN, 'minutes').isBefore(moment());

const _getMinBeforeExpires = (expirationDate) => moment(expirationDate).diff(moment(), 'minutes');

const ExpirationWarningModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [minBeforeExpires, setMinBeforeExpires] = useState(0);
    const { expires, logout, refreshToken } = useAuthContext();

    // Warn user before access token is about to expire; log user
    // out before expiration if user does not take action.
    useEffect(() => {
        if (!expires) return;

        const checkInterval = setInterval(() => {
            if (_shouldLogoutUser(expires)) {
                logout();
            } else if (_shouldWarnUser(expires) && !isOpen) {
                setIsOpen(true);
            }

            setMinBeforeExpires(_getMinBeforeExpires(expires));
        }, CHECK_INTERVAL_SEC * 1000);

        return () => {
            clearInterval(checkInterval);
        };
    }, [expires, isOpen]);

    const handleKeepListening = async () => {
        setIsOpen(false);
        refreshToken();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            disableBackdropClick
            disableEscapeKeyDown
            aria-labelledby={'session-timeout-modal'}
            maxWidth={'xs'}
            fullWidth
        >
            <DialogTitle>Your Session is About to Expire</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Your session with Spotify is going to expire in {minBeforeExpires} minutes. If
                    you want to continue listening to music, please click "Keep Listening". You will
                    automatically be logged out when your session expires if you do not respond.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant={'contained'} onClick={logout}>
                    Log Out
                </Button>
                <Button variant={'contained'} onClick={handleKeepListening} color={'primary'}>
                    Keep Listening
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExpirationWarningModal;
