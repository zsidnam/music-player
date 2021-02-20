import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import spotifyApi from '../services/spotify-api';
import { getURLHash } from '../utils/window';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            const { data } = await spotifyApi.get('/v1/me');
            setUser({
                id: data.id,
                name: data.display_name,
                email: data.email,
                profilePic: data.images[0],
            });
        } catch (err) {
            console.error(err);
            setUser(null);
        }
    }, []);

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
                    await fetchUser(existingToken);
                    // TODO: if this fails with unauthrorized request, unset auth
                }
            } else {
                window.location.hash = '';
                const { access_token, refresh_token } = hash;

                if (access_token && refresh_token) {
                    localStorage.setItem('accessToken', access_token);
                    localStorage.setItem('refreshToken', refresh_token);
                    spotifyApi.defaults.headers.Authorization = `Bearer ${access_token}`;
                    await fetchUser(access_token);
                    router.replace('/');
                }
            }

            setLoading(false);
        }

        initAuth();
        // purposefully omit router from dependency array as we only need the replace fn
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUser]);

    const store = {
        user,
        isLoading,
        logout: () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            // Force axios, apollo client, and everything else to be reset
            window.location = '/';
        },
    };

    return (
        <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node,
};

export const useAuthContext = () => useContext(AuthContext);
