import { createContext, useContext, useState, useEffect } from 'react';
import spotifyApi from '../services/spotify-api';
import { useRouter } from 'next/router';

import { getURLHash } from '../utils/window';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            const { data } = await spotifyApi.get('/v1/me');
            setUser({
                id: data.id,
                name: data.display_name,
                email: data.email,
                profilePic: data.images[0],
            });

            // Remove hash from URL
            router.replace('/');

            setLoading(false);
        }

        const hash = getURLHash();
        window.location.hash = '';

        const token = hash.access_token;
        if (token) {
            setAccessToken(token);
            spotifyApi.defaults.headers.Authorization = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const store = {
        accessToken,
        user,
        isLoading,
    };

    return (
        <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
