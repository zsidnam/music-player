import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const ColorizedContainer = ({ children, primaryColor }) => {
    return (
        <Box
            style={{
                '--color-1': `${primaryColor}`,
                '--color-2': 'black',
                background: `linear-gradient(175deg, var(--color-1), var(--color-2) 80%)`,
            }}
        >
            {children}
        </Box>
    );
};

ColorizedContainer.propTypes = {
    children: PropTypes.node,
    primaryColor: PropTypes.string.isRequired,
};

export default ColorizedContainer;
