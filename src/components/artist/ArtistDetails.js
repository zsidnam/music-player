import PropTypes from 'prop-types';
import { Box, Container, Grid } from '@material-ui/core';
import { usePalette } from 'react-palette';

import ColorizedContainer from '../common/ColorizedContainer';
import ArtistSummary from './ArtistSummary';
import Discography from './Discography';
import RelatedArtists from './RelatedArtists';
import TopTracks from './TopTracks';

const HORIZ_PADDING_SPACES = 5;
const MAX_WIDTH = 'lg';

const ArtistDetails = ({ artist }) => {
    const artistImgSrc = artist.images.length && artist.images[0].url;

    // Extract colors from artwork to use in artist display
    const { data: cData, loading: cLoading, error: cError } = usePalette(artistImgSrc);
    const primaryDarkColor = cData && !cLoading && !cError ? cData.darkVibrant : 'inherit';
    const primaryLightColor = cData && !cLoading && !cError ? cData.lightVibrant : 'inherit';

    return (
        <Box mb={10}>
            <ColorizedContainer primaryColor={primaryDarkColor} maxWidth={MAX_WIDTH}>
                <Box px={HORIZ_PADDING_SPACES} pb={5} pt={13}>
                    <ArtistSummary artist={artist} primaryColor={primaryLightColor} />
                </Box>
            </ColorizedContainer>

            <Container maxWidth={MAX_WIDTH}>
                <Box px={HORIZ_PADDING_SPACES} mb={6}>
                    <Grid container>
                        <Grid item xs={6}>
                            <TopTracks />
                        </Grid>
                        <Grid item xs={6}>
                            <RelatedArtists />
                        </Grid>
                    </Grid>

                    <Discography />
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
