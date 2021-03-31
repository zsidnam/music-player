import PropTypes from 'prop-types';
import { Box, Container, Grid, useTheme } from '@material-ui/core';
import { usePalette } from 'react-palette';

import ColorizedContainer from '../common/ColorizedContainer';
import ArtistSummary from './ArtistSummary';
import Discography from './Discography';
import RelatedArtists from './RelatedArtists';
import TopTracks from './TopTracks';

const HORIZ_PADDING_SPACES = 5;
const MAX_WIDTH = 'lg';

const ArtistDetails = ({ artist }) => {
    const theme = useTheme();
    const artistImgSrc = artist.images.length && artist.images[0].url;

    // Extract colors from artwork to use in artist display
    const { data: cData, loading: cLoading, error: cError } = usePalette(artistImgSrc);
    const primaryDarkColor = cLoading
        ? 'inherit'
        : cData && !cError
        ? cData.darkVibrant
        : theme.palette.common.darkGrey;
    const primaryLightColor = cLoading
        ? 'inherit'
        : cData && !cError
        ? cData.lightVibrant
        : theme.palette.primary.main;

    // TODO: The artist summary could probably be refactored to fetch
    // its own data. Briefly tried this and ran into some weird caching issues,
    // so decided to revisit later.

    return (
        <Box mb={10}>
            <ColorizedContainer primaryColor={primaryDarkColor} maxWidth={MAX_WIDTH}>
                <Box px={HORIZ_PADDING_SPACES} pb={5} pt={12}>
                    <ArtistSummary artist={artist} primaryColor={primaryLightColor} />
                </Box>
            </ColorizedContainer>

            <Container maxWidth={MAX_WIDTH}>
                <Box px={HORIZ_PADDING_SPACES} mb={6}>
                    <Box mb={4}>
                        <Grid container spacing={5}>
                            <Grid item xs={7} md={8}>
                                <TopTracks
                                    artistId={artist.id}
                                    artistUri={artist.uri}
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
