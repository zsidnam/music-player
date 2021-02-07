import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import { AuthContextProvider } from '../context/authContext';
import { MenuContextProvider } from '../context/menuContext';
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
                <MenuContextProvider>
                    <Layout>
                        <RouteProtector>
                            <Component {...pageProps} />
                        </RouteProtector>
                    </Layout>
                </MenuContextProvider>
            </AuthContextProvider>
        </ThemeProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};

export default MyApp;
