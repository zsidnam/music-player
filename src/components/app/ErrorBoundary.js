import { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Container, Button } from '@material-ui/core';
import SadIcon from '@material-ui/icons/SentimentDissatisfied';

import { AuthContext } from '../../context/authContext';

class ErrorBoundary extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = { hasError: false };

        this.handleLogout = this.handleLogout.bind(this);
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error);
        console.error(errorInfo);
    }

    handleLogout() {
        this.context.logout();
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    height={'100vh'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Container maxWidth={'sm'}>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Box fontSize={'5rem'} mb={2}>
                                <SadIcon fontSize={'inherit'} />
                            </Box>
                            <Box mb={2}>
                                <Typography variant={'h3'}>
                                    Well... this is embarrassing.
                                </Typography>
                            </Box>
                            <Box mb={10}>
                                <Typography>
                                    Looks like a good old-fashioned error occurred. Please try
                                    refreshing the page. If problems persist, try logging out and
                                    then logging back in. If none of that works, please fix my code
                                    for me.
                                </Typography>
                            </Box>

                            <Button
                                onClick={this.handleLogout}
                                variant={'contained'}
                                color={'primary'}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Container>
                </Box>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node,
};

export default ErrorBoundary;
