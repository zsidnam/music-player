import PropTypes from 'prop-types';
import { Box, Container } from '@material-ui/core';
import omit from 'lodash.omit';

import AlbumSummary from './AlbumSummary';
import AlbumInfoFooter from './AlbumInfoFooter';
import TrackTable, { COLUMNS } from '../track/TrackTable';
import ColorizedContainer from '../common/ColorizedContainer';
import { useImageColors } from '../../hooks/useImageColors';

const AlbumDetails = ({ album }) => {
    const albumArtImgSrc = album.images.length && album.images[0].url;
    const { primaryDarkColor, primaryLightColor } = useImageColors(albumArtImgSrc);

    return (
        <Box mb={10}>
            <ColorizedContainer primaryColor={primaryDarkColor} maxWidth={'lg'}>
                <Box px={5} pb={5} pt={13}>
                    <AlbumSummary
                        album={omit(album, ['tracks'])}
                        primaryColor={primaryLightColor}
                    />
                </Box>
            </ColorizedContainer>

            <Container maxWidth={'lg'}>
                <Box px={5} mb={6}>
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
