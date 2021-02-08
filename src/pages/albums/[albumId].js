import { Box } from '@material-ui/core';
import { usePalette } from 'react-palette';

import AlbumSummary from '../../components/album/AlbumSummary';
import AlbumInfoFooter from '../../components/album/AlbumInfoFooter';
import MainLayout from '../../layouts/MainLayout';
import TrackTable from '../../components/track/TrackTable';
import ColorizedContainer from '../../components/common/ColorizedContainer';

// TODO: Remove dummy data
import dummyData from '../../../album-dummy-data.json';
//const albumArtImgSrc = dummyData.images[0].url;
const albumArtImgSrc =
    'https://i.scdn.co/image/ab67616d00001e0273e509d7beb066e9746946d2';

const HORIZ_PADDING_SPACES = 5;

const AlbumPage = () => {
    // Extract colors from artwork to use in album display
    const { data, loading, error } = usePalette(albumArtImgSrc);
    const primaryDarkColor =
        data && !loading && !error ? data.darkVibrant : 'inherit';
    const primaryLightColor =
        data && !loading && !error ? data.lightVibrant : 'inherit';

    return (
        <Box mb={10}>
            <ColorizedContainer primaryColor={primaryDarkColor}>
                <Box px={HORIZ_PADDING_SPACES} pb={5} pt={12}>
                    <AlbumSummary primaryColor={primaryLightColor} />
                </Box>
            </ColorizedContainer>

            <Box px={HORIZ_PADDING_SPACES}>
                <TrackTable primaryColor={primaryLightColor} />
            </Box>

            <Box px={HORIZ_PADDING_SPACES} mt={6}>
                <AlbumInfoFooter copyrights={dummyData.copyrights} />
            </Box>
        </Box>
    );
};

AlbumPage.Layout = MainLayout;

export default AlbumPage;
