import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import { AuthContextProvider } from '../context/authContext';
import RouteProtector from '../components/auth/RouteProtector';
import theme from '../styles/theme';

const NoOp = ({ children }) => children;

function MyApp({ Component, pageProps }) {
    const Layout = Component.Layout || NoOp;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthContextProvider>
                <RouteProtector>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </RouteProtector>
            </AuthContextProvider>
        </ThemeProvider>
    );
}

export default MyApp;
