import { useState, useEffect } from 'react';
import DevicesIcon from '@material-ui/icons/Devices';

import {
    Box,
    IconButton,
    Popover,
    makeStyles,
    Typography,
    Divider,
    MenuList,
} from '@material-ui/core';

import spotifyApi from '../../../services/spotify-api';
import DeviceMenuItem from './DeviceMenuItem';

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
const DeviceMenu = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState(false);

    // Track active device ID updated from user click
    // to allow for optimistic update
    const [forcedActiveDeviceId, setForcedActiveDeviceId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await spotifyApi.get('/v1/me/player/devices');
                setDevices(data.devices);
                setError(false);
            } catch (err) {
                // TODO: Set up snackbar notification
                setError(true);
                setDevices([]);
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
            <IconButton color={'secondary'} onClick={handleClick}>
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
                <Typography
                    align={'center'}
                    variant={'h6'}
                    style={{ textTransform: 'uppercase' }}
                >
                    Connect a Device
                </Typography>

                <Box mb={1}>
                    <Divider />
                </Box>

                {devices.length ? (
                    <MenuList variant={'menu'} autoFocusItem>
                        {devices.map((device) => (
                            <DeviceMenuItem
                                key={device.id || device.name}
                                device={device}
                                forcedActiveDeviceId={forcedActiveDeviceId}
                                onDeviceSelect={updateActiveDevice}
                            />
                        ))}
                    </MenuList>
                ) : (
                    <Box py={2}>
                        <Typography
                            align={'center'}
                            variant={'body2'}
                            className={classes.emptyText}
                        >
                            {error
                                ? 'Unable to retrieve devices'
                                : 'No Players Available'}
                        </Typography>
                    </Box>
                )}
            </Popover>
        </>
    );
};

export default DeviceMenu;
