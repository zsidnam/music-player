import PropTypes from 'prop-types';
import { Box, MenuItem, Typography, makeStyles } from '@material-ui/core';
import ComputerIcon from '@material-ui/icons/Computer';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import SpeakerIcon from '@material-ui/icons/Speaker';
import UnknownIcon from '@material-ui/icons/DeviceUnknown';

import spotifyApi from '../../../services/spotify-api';

const DeviceType = {
    COMPUTER: 'computer',
    SMARTPHONE: 'smartphone',
    SPEAKER: 'speaker',
};

const _getPlayerIcon = (type, isActive) => {
    let Icon;
    switch (type.toLowerCase()) {
        case DeviceType.COMPUTER: {
            Icon = ComputerIcon;
            break;
        }

        case DeviceType.SMARTPHONE: {
            Icon = PhoneIcon;
            break;
        }

        case DeviceType.SPEAKER: {
            Icon = SpeakerIcon;
            break;
        }

        default: {
            Icon = UnknownIcon;
        }
    }

    return <Icon color={isActive ? 'primary' : 'inherit'} />;
};

const useStyles = makeStyles((theme) => ({
    menuItem: {
        '&:hover': {
            outline: `1px solid ${theme.palette.primary.main}`,
        },
    },
}));

const DeviceMenuItem = ({ device, onDeviceSelect, forcedActiveDeviceId }) => {
    const classes = useStyles();
    const { id, name, is_restricted, is_active, type } = device;

    // Parent component may override is_active flag to allow for optimistic update
    // when user selects new device to connect to.
    const showActive = forcedActiveDeviceId
        ? forcedActiveDeviceId === id
        : is_active;

    const handleClick = async () => {
        try {
            if (showActive) return;

            await spotifyApi.put('/v1/me/player', {
                device_ids: [id],
                play: true,
            });

            onDeviceSelect(id);
        } catch (err) {
            // TODO: Set up snackbar notification
            console.error('Unable to transfer playback');
        }
    };

    return (
        <MenuItem
            disabled={is_restricted}
            className={classes.menuItem}
            onClick={handleClick}
        >
            <Box display={'flex'} alignItems={'flex-start'}>
                <Box mr={2}>{_getPlayerIcon(type, showActive)}</Box>
                <Typography color={showActive ? 'primary' : 'textPrimary'}>
                    {name}
                </Typography>
            </Box>
        </MenuItem>
    );
};

DeviceMenuItem.propTypes = {
    forcedActiveDeviceId: PropTypes.string,
    onDeviceSelect: PropTypes.func.isRequired,
    device: PropTypes.shape({
        id: PropTypes.string, // not guaranteed by Spotify
        name: PropTypes.string,
        is_restricted: PropTypes.bool,
        is_active: PropTypes.bool,
        type: PropTypes.string,
    }),
};

export default DeviceMenuItem;
