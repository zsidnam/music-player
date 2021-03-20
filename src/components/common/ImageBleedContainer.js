import PropTypes from 'prop-types';
import { Box, Container } from '@material-ui/core';

const ImageBleedContainer = ({ children, backgroundImgSrc, maxWidth }) => {
    return (
        <Box style={{ backgroundImage: `url(${backgroundImgSrc})`, backgroundSize: 'cover' }}>
            <Container maxWidth={maxWidth}>{children}</Container>
        </Box>
    );
};

ImageBleedContainer.defaultProps = {
    maxWidth: 'false',
};

ImageBleedContainer.propTypes = {
    children: PropTypes.node,
    maxWidth: PropTypes.string,
    backgroundImgSrc: PropTypes.string.isRequired,
};

export default ImageBleedContainer;
