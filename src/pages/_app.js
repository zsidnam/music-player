import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

import { getURLHash } from '../utils/window'



function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const hash = getURLHash();
    window.location.hash = "";

    const token = hash.access_token;
    if (token) {
      updateAccessToken(token);
      console.log(token);

      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((data) => {
          console.log(data);
          return data;
        })
        .then(({ data }) =>
          updateUser({
            id: data.id,
            name: data.display_name,
            email: data.email,
            profilePic: data.images[0],
          })
        );
      router.replace("/");
    }
  }, []);

  return (
    <UserContextProvider>
      <Component {...pageProps} />;
    </UserContextProvider>
  );
}

export default MyApp;
