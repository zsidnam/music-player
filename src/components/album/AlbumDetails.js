import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { usePalette } from 'react-palette';
import omit from 'lodash.omit';

import AlbumSummary from './AlbumSummary';
import AlbumInfoFooter from './AlbumInfoFooter';
import TrackTable from '../track/TrackTable';
import ColorizedContainer from '../common/ColorizedContainer';

const HORIZ_PADDING_SPACES = 5;

const AlbumDetails = ({ album }) => {
    const albumArtImgSrc = album.images.length && album.images[0].url;

    // Extract colors from artwork to use in album display
    const { data: cData, loading: cLoading, error: cError } = usePalette(
        albumArtImgSrc
    );
    const primaryDarkColor =
        cData && !cLoading && !cError ? cData.darkVibrant : 'inherit';
    const primaryLightColor =
        cData && !cLoading && !cError ? cData.lightVibrant : 'inherit';

    return (
        <Box mb={10}>
            <ColorizedContainer primaryColor={primaryDarkColor}>
                <Box px={HORIZ_PADDING_SPACES} pb={5} pt={12}>
                    <AlbumSummary
                        album={omit(album, ['tracks'])}
                        primaryColor={primaryLightColor}
                    />
                </Box>
            </ColorizedContainer>

            <Box px={HORIZ_PADDING_SPACES}>
                <TrackTable
                    tracks={album.tracks.items}
                    primaryColor={primaryLightColor}
                />
            </Box>

            <Box px={HORIZ_PADDING_SPACES} mt={6}>
                <AlbumInfoFooter copyrights={album.copyrights} />
            </Box>
        </Box>
    );
};

AlbumDetails.propTypes = {
    album: PropTypes.object,
};

export default AlbumDetails;
