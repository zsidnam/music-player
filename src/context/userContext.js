import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserContextProvider = ({
    initUser,
    initAccessToken,
    children,
}) => {
    const [accessToken, setAccessToken] = useState(initAccessToken);
    const [user, setUser] = useState(initUser);

    const store = {
        accessToken,
        user,
        //updateAccessToken: (newToken) => setAccessToken(newToken),
        //updateUser: (newUser) => setUser(newUser),
    };

    return (
        <UserContext.Provider value={store}>{children}</UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
