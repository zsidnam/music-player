import React from 'react';
import { Box, Grid, Slider, IconButton } from '@material-ui/core';

import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import DevicesIcon from '@material-ui/icons/Devices';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const SecondaryControls = () => {
    return (
        <Grid container justify={'flex-end'} alignItems={'center'} spacing={1}>
            <Grid item>
                <IconButton color={'secondary'}>
                    <PlaylistPlayIcon fontSize={'small'} />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton color={'secondary'}>
                    <DevicesIcon fontSize={'small'} />
                </IconButton>
            </Grid>
            <Grid item>
                <Grid container alignItems={'flex-start'}>
                    <Grid item>
                        <IconButton color={'secondary'}>
                            <VolumeUpIcon fontSize={'small'} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Box width={100}>
                            <Slider />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

SecondaryControls.propTypes = {};

export default SecondaryControls;
