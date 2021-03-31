import PropTypes from 'prop-types';
import { Container, Box, Fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    gradient: {
        '--color-1': ({ primaryColor }) => primaryColor,
        '--color-2': 'black',
        background: `linear-gradient(175deg, var(--color-1), var(--color-2) 80%)`,
    },
    solid: {
        backgroundColor: ({ primaryColor }) => primaryColor,
    },
}));

const ColorizedContainer = ({ children, primaryColor, maxWidth, useGradient }) => {
    const classes = useStyles({ primaryColor });

    return (
        <Fade in={true}>
            <Box className={useGradient ? classes.gradient : classes.solid}>
                <Container maxWidth={maxWidth}>{children}</Container>
            </Box>
        </Fade>
    );
};

ColorizedContainer.defaultProps = {
    maxWidth: 'false',
    useGradient: true,
};

ColorizedContainer.propTypes = {
    children: PropTypes.node,
    maxWidth: PropTypes.string,
    primaryColor: PropTypes.string.isRequired,
};

export default ColorizedContainer;
