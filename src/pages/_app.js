import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { AnimateSharedLayout } from 'framer-motion';

import { useApollo } from '../services/apollo-client';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { AuthContextProvider } from '../context/authContext';
import { MenuContextProvider } from '../context/menuContext';
import { PlayStateContextProvider } from '../context/playStateContext';
import { SearchContextProvider } from '../context/searchContext';
import RouteProtector from '../components/auth/RouteProtector';
import ExpirationWarningModal from '../components/app/ExpirationWarningModal';
import Snackbar from '../components/app/Snackbar';
import ErrorBoundary from '../components/app/ErrorBoundary';
import theme from '../styles/theme';

const NoOp = ({ children }) => children;

function MyApp({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps);
    const Layout = Component.Layout || NoOp;

    useScrollToTop();

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Music Player</title>
            </Head>

            <ApolloProvider client={apolloClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Snackbar>
                        <AuthContextProvider>
                            <MenuContextProvider>
                                <PlayStateContextProvider>
                                    <SearchContextProvider>
                                        <ErrorBoundary>
                                            <Layout>
                                                <RouteProtector>
                                                    <AnimateSharedLayout>
                                                        <Component {...pageProps} />
                                                    </AnimateSharedLayout>
                                                    <ExpirationWarningModal />
                                                </RouteProtector>
                                            </Layout>
                                        </ErrorBoundary>
                                    </SearchContextProvider>
                                </PlayStateContextProvider>
                            </MenuContextProvider>
                        </AuthContextProvider>
                    </Snackbar>
                </ThemeProvider>
            </ApolloProvider>
        </>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};

export default MyApp;
