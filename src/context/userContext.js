import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const store = {
    accessToken,
    user,
    updateAccessToken: (newToken) => setAccessToken(newToken),
    updateUser: (newUser) => setUser(newUser),
  };

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
