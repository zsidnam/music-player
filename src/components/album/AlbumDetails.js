import PropTypes from 'prop-types';
import { Box, Container } from '@material-ui/core';
import { usePalette } from 'react-palette';
import omit from 'lodash.omit';

import AlbumSummary from './AlbumSummary';
import AlbumInfoFooter from './AlbumInfoFooter';
import TrackTable, { COLUMNS } from '../track/TrackTable';
import ColorizedContainer from '../common/ColorizedContainer';

const HORIZ_PADDING_SPACES = 5;
const MAX_WIDTH = 'lg';

const AlbumDetails = ({ album }) => {
    const albumArtImgSrc = album.images.length && album.images[0].url;

    // Extract colors from artwork to use in album display
    const { data: cData, loading: cLoading, error: cError } = usePalette(albumArtImgSrc);
    const primaryDarkColor = cData && !cLoading && !cError ? cData.darkVibrant : 'inherit';
    const primaryLightColor = cData && !cLoading && !cError ? cData.lightVibrant : 'inherit';

    return (
        <Box mb={10}>
            <ColorizedContainer primaryColor={primaryDarkColor} maxWidth={MAX_WIDTH}>
                <Box px={HORIZ_PADDING_SPACES} pb={5} pt={13}>
                    <AlbumSummary
                        album={omit(album, ['tracks'])}
                        primaryColor={primaryLightColor}
                    />
                </Box>
            </ColorizedContainer>

            <Container maxWidth={MAX_WIDTH}>
                <Box px={HORIZ_PADDING_SPACES} mb={6}>
                    <TrackTable
                        tracks={album.tracks.items}
                        primaryColor={primaryLightColor}
                        contextUri={album.uri}
                        columns={[COLUMNS.TRACK_NUMBER, COLUMNS.TITLE, COLUMNS.TIME]}
                    />
                </Box>

                <AlbumInfoFooter copyrights={album.copyrights} />
            </Container>
        </Box>
    );
};

AlbumDetails.propTypes = {
    album: PropTypes.object,
};

export default AlbumDetails;
