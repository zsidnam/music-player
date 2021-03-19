import PropTypes from 'prop-types';
import { Container, Box } from '@material-ui/core';

const ColorizedContainer = ({ children, primaryColor, maxWidth, useGradient }) => {
    const gradientStyles = {
        '--color-1': `${primaryColor}`,
        '--color-2': 'black',
        background: `linear-gradient(175deg, var(--color-1), var(--color-2) 80%)`,
    };

    return (
        <Box style={useGradient ? gradientStyles : { backgroundColor: primaryColor }}>
            <Container maxWidth={maxWidth}>{children}</Container>
        </Box>
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
