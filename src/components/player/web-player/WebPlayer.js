import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';

import spotifyApi from '../../../services/spotify-api';
import loadWebPlayer from './load-web-player';
import PlayingInfo from '../player-elements/PlayingInfo';
import PrimaryControls from '../player-elements/PrimaryControls';
import SecondaryControls from '../player-elements/SecondaryControls';
import PlaybackTransferModal from './PlaybackTransferModal';

const WebPlayer = ({ token }) => {
    const [loaded, setLoaded] = useState(false);
    const [player, setPlayer] = useState(null);
    const [showPlaybackModal, setPlaybackModalDisplay] = useState(false);

    const transferPlayback = async () => {
        try {
            console.log(
                `attempting to transfer with device id: ${player._options.id}`
            );
            const response = await spotifyApi.put('/v1/me/player', {
                device_ids: [player._options.id],
                play: true,
            });
            console.log(response);
        } catch (err) {
            console.error(
                `message=${err.message}; reason=${err.reason}; status=${err.status}`
            );
        }
    };

    useEffect(() => {
        loadWebPlayer(token, (webPlayer) => {
            setLoaded(true);
            setPlayer(webPlayer);

            // TODO: handle error if player does not load
        });
    }, [token]);

    // Once player is loaded, show modal to user to prompt
    // playback transfer
    useEffect(() => {
        if (loaded) {
            setPlaybackModalDisplay(true);
        }
    }, [loaded]);

    if (!loaded) {
        return <Box>Loading...</Box>;
    }

    return (
        <>
            <Button onClick={transferPlayback}>Play Here</Button>
            <PlayingInfo />
            <PrimaryControls />
            <SecondaryControls />
            <PlaybackTransferModal
                open={showPlaybackModal}
                onClose={() => setPlaybackModalDisplay(false)}
                transferPlayback={transferPlayback}
            />
        </>
    );
};

WebPlayer.propTypes = {
    token: PropTypes.string.isRequired,
};

export default WebPlayer;
