import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';

import spotifyApi from '../../../services/spotify-api';
import loadWebPlayer from './load-web-player';
import PlayingInfo from '../player-elements/PlayingInfo';
import PrimaryControls from '../player-elements/PrimaryControls';
import SecondaryControls from '../player-elements/SecondaryControls';
import PlaybackTransferModal from './PlaybackTransferModal';

const noOp = () => {};

const getPlaybackControls = (player) => ({
    togglePlay: player ? player.togglePlay : noOp,
    seek: player ? player.seek : noOp,
    prev: player ? player.previousTrack : noOp,
    next: player ? player.nextTrack : noOp,
});

const WebPlayer = ({ token }) => {
    const [loaded, setLoaded] = useState(false);
    const [player, setPlayer] = useState(null);
    const [showPlaybackModal, setPlaybackModalDisplay] = useState(false);
    const [playerState, setPlayerState] = useState({});

    const handleStateUpdate = (newPlayerState) => {
        console.log('Changed!');
        console.log(newPlayerState);
        setPlayerState(newPlayerState);
    };

    const transferPlayback = async () => {
        try {
            await spotifyApi.put('/v1/me/player', {
                device_ids: [player._options.id],
                play: true,
            });
        } catch (err) {
            console.error(
                `message=${err.message}; reason=${err.reason}; status=${err.status}`
            );
        }
    };

    useEffect(() => {
        loadWebPlayer(token, handleStateUpdate, (webPlayer) => {
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
            <Grid container justify={'space-between'} alignItems={'center'}>
                <Grid item xs={4} lg={3} xl={2}>
                    <PlayingInfo
                        currentTrack={
                            playerState.track_window &&
                            playerState.track_window.current_track
                        }
                    />
                </Grid>
                <Grid item xs={4} lg={6} xl={8}>
                    <PrimaryControls
                        playerState={playerState}
                        playbackControls={getPlaybackControls(player)}
                    />
                </Grid>
                <Grid item xs={4} lg={3} xl={2}>
                    <SecondaryControls />
                </Grid>
            </Grid>

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
