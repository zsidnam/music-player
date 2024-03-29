import PropTypes from 'prop-types';
import { Box, Container, Grid } from '@material-ui/core';

import ColorizedContainer from '../common/ColorizedContainer';
import ArtistSummary from './ArtistSummary';
import Discography from './Discography';
import RelatedArtists from './RelatedArtists';
import ArtistTopTracks from './ArtistTopTracks';
import { useImageColors } from '../../hooks/useImageColors';

const ArtistDetails = ({ artist }) => {
    const artistImgSrc = artist.images.length && artist.images[0].url;
    const { primaryDarkColor, primaryLightColor } = useImageColors(artistImgSrc);

    return (
        <Box mb={10}>
            <ColorizedContainer primaryColor={primaryDarkColor} maxWidth={'lg'}>
                <Box px={5} pb={5} pt={12}>
                    <ArtistSummary artist={artist} primaryColor={primaryLightColor} />
                </Box>
            </ColorizedContainer>

            <Container maxWidth={'lg'}>
                <Box px={5} mb={6}>
                    <Box mb={4}>
                        <Grid container spacing={5}>
                            <Grid item xs={7} md={8}>
                                <ArtistTopTracks
                                    artistId={artist.id}
                                    primaryColor={primaryLightColor}
                                />
                            </Grid>
                            <Grid item xs={5} md={4}>
                                <RelatedArtists artistId={artist.id} />
                            </Grid>
                        </Grid>
                    </Box>

                    <Discography artistId={artist.id} />
                </Box>
            </Container>
        </Box>
    );
};

ArtistDetails.propTypes = {
    artist: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                height: PropTypes.number.isRequired,
                width: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default ArtistDetails;
