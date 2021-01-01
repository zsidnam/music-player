import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button } from '@material-ui/core';

import { useUserContext } from '../context/userContext';
import { getURLHash } from '../utils/window';

const HomePage = () => {
    const { accessToken, user } = useUserContext();

    const handleTestTwo = (e) => {
        e.preventDefault();
        spotifyApi.getUserPlaylists().then((result) => console.log(result));
    };

    const pause = (e) => {
        e.preventDefault();
        console.log(accessToken);
        axios
            .put('https://api.spotify.com/v1/me/player/pause', null, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            })
            .then((resp) => console.log(resp))
            .catch((resp) => console.log(resp));
    };

    if (user) {
        return (
            <div>
                <p>You are logged in.</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <img src={user.profilePic.url} />
                <button onClick={pause}>test</button>
            </div>
        );
    }

    return (
        <>
            <Button variant={'contained'} href={'/api/auth/login'}>
                Login
            </Button>
            <Button onClick={handleTestTwo}>Test 2</Button>
        </>
    );
};

HomePage.propTypes = {};

export default HomePage;
