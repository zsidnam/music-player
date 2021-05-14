import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DevicesIcon from '@material-ui/icons/Devices';
import { useSnackbar } from 'notistack';
import {
    Box,
    IconButton,
    Popover,
    makeStyles,
    Typography,
    Divider,
    MenuList,
    CircularProgress,
} from '@material-ui/core';

import { getDevices } from '../../../services/spotify-api';
import DeviceMenuItem from './DeviceMenuItem';
import DeviceConnector from './DeviceConnector';

const useStyles = makeStyles((theme) => ({
    menu: {
        minWidth: '13rem',
    },
    emptyText: {
        color: theme.palette.common.offWhite,
    },
}));

// TODO: Consider memoizing component

// Device Menu implementation is the same regardless of whether Web Player
// or Connect Player is active. Component will fetch it's own data instead of
// relying on player for implementation.
const DeviceMenu = ({ connectMode, syncActiveDevice, pollingPlayerState }) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [anchorEl, setAnchorEl] = useState(null);
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(false);

    // Track active device ID updated from user click
    // to allow for optimistic update
    const [forcedActiveDeviceId, setForcedActiveDeviceId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const devices = await getDevices();
                setDevices(devices);
                setLoading(false);
            } catch (err) {
                setDevices([]);
                setLoading(false);
                enqueueSnackbar('Unable to get devices.', { variant: 'error' });
            }
        }

        if (anchorEl) {
            fetchData();
        }
    }, [anchorEl]);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setForcedActiveDeviceId(null);
    };

    const updateActiveDevice = (deviceId) => {
        setForcedActiveDeviceId(deviceId);
    };

    return (
        <>
            <IconButton color={connectMode ? 'primary' : 'secondary'} onClick={handleClick}>
                <DevicesIcon fontSize={'small'} />
            </IconButton>

            <Popover
                id={'device-menu'}
                classes={{ paper: classes.menu, list: classes.menuList }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Typography align={'center'} variant={'h6'} style={{ textTransform: 'uppercase' }}>
                    Connect to Device
                </Typography>

                <Box mb={1}>
                    <Divider />
                </Box>

                {loading ? (
                    <Box
                        height={'6rem'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <CircularProgress size={30} />
                    </Box>
                ) : (
                    <MenuList variant={'menu'} autoFocusItem>
                        {(devices || []).map((device) => (
                            <DeviceMenuItem
                                key={device.id || device.name}
                                device={device}
                                forcedActiveDeviceId={forcedActiveDeviceId}
                                onDeviceSelect={updateActiveDevice}
                            />
                        ))}

                        {/* // If no devices are active, provide additional option to check
                        // for active device (start polling player state again) */}
                        {syncActiveDevice &&
                            devices.every((d) => !d.is_active && !forcedActiveDeviceId) && (
                                <DeviceConnector
                                    key={'device-connector'}
                                    syncActiveDevice={syncActiveDevice}
                                    pollingPlayerState={!!pollingPlayerState}
                                />
                            )}
                    </MenuList>
                )}
            </Popover>
        </>
    );
};

DeviceMenu.propTypes = {
    connectMode: PropTypes.bool,
    // The following props are optional and used
    // by the Connect Player only
    pollingPlayerState: PropTypes.bool,
    syncActiveDevice: PropTypes.func,
};

export default DeviceMenu;
