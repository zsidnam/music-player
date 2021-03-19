import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const ArtistSummary = ({ artist, primaryColor }) => {
    const artistImgSrc = artist.images.length && artist.images[0].url;

    return (
        <Box>
            <img
                src={artistImgSrc}
                height={350}
                width={'100%'}
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
            />
        </Box>
    );
};

ArtistSummary.propTypes = {
    primaryColor: PropTypes.string,
    artist: PropTypes.shape({}).isRequired,
};

export default ArtistSummary;
