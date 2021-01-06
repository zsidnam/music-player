import React, { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import { AuthContextProvider } from '../context/authContext';
import RouteProtector from '../components/auth/RouteProtector';
import theme from '../styles/theme';

const NoOp = ({ children }) => children;

function MyApp({ Component, pageProps }) {
    const Layout = Component.Layout || NoOp;

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthContextProvider>
                <Layout>
                    <RouteProtector>
                        <Component {...pageProps} />
                    </RouteProtector>
                </Layout>
            </AuthContextProvider>
        </ThemeProvider>
    );
}

export default MyApp;
