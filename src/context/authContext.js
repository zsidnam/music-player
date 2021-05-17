import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import moment from 'moment';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import spotifyApi from '../services/spotify-api';
import { getURLHash } from '../utils/window';

const _getSecondsFromNowDate = (sec) => moment().add(sec, 'seconds').toISOString();

const _clearLocalStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expires');
};

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [expires, setExpires] = useState(null);

    const _setAccessToken = useCallback((accessToken, expiresIn) => {
        spotifyApi.defaults.headers.Authorization = `Bearer ${accessToken}`;
        localStorage.setItem('accessToken', accessToken);

        const expirationDate = _getSecondsFromNowDate(expiresIn);
        localStorage.setItem('expires', expirationDate);
        setExpires(expirationDate);
    }, []);

    const _setRefreshToken = useCallback((refreshToken) => {
        localStorage.setItem('refreshToken', refreshToken);
    }, []);

    const _fetchUser = useCallback(async () => {
        try {
            const { data } = await spotifyApi.get('/v1/me');
            setUser({
                id: data.id,
                name: data.display_name,
                email: data.email,
                profilePic: data.images[0],
                uri: data.uri,
            });
        } catch (err) {
            setUser(null);
            setExpires(null);
            _clearLocalStorage();
            enqueueSnackbar(
                'Unable to get your user profile. Please refresh your browser and try again.',
                { variant: 'error' }
            );
        }
    }, []);

    const logout = () => {
        // Force axios, apollo client, and everything else to be reset
        _clearLocalStorage();
        window.location = '/';
    };

    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const { data } = await axios.post('/api/auth/refresh-token', { refreshToken });
            _setAccessToken(data.accessToken, data.expiresIn);
        } catch (err) {
            enqueueSnackbar(
                'Unable to refresh your user session. Please logout and then sign in again.',
                { variant: 'error' }
            );
        }
    };

    useEffect(() => {
        async function initAuth() {
            // Determine whether user just completed login flow, or just
            // navigated to the home page normally.
            const hash = getURLHash();
            const loggingIn = !!hash.access_token;

            if (!loggingIn) {
                // If user is not logging in, check if token exists and attempt
                // to restore user session from local storage.
                const existingToken = localStorage.getItem('accessToken');
                if (existingToken) {
                    spotifyApi.defaults.headers.Authorization = `Bearer ${existingToken}`;
                    setExpires(localStorage.getItem('expires'));
                    await _fetchUser(existingToken);
                }
            } else {
                window.location.hash = '';
                const { access_token, refresh_token, expires_in } = hash;
                if (access_token && refresh_token) {
                    _setAccessToken(access_token, expires_in);
                    _setRefreshToken(refresh_token);
                    await _fetchUser(access_token);
                    router.replace('/');
                }
            }

            setLoading(false);
        }

        initAuth();
        // purposefully omit router from dependency array
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_fetchUser, _setAccessToken, _setRefreshToken]);

    const store = {
        user,
        isLoading,
        expires,
        logout,
        refreshToken,
    };

    return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
    children: PropTypes.node,
};

export const useAuthContext = () => useContext(AuthContext);
