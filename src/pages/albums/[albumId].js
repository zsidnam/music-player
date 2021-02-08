import { Box } from '@material-ui/core';
import { usePalette } from 'react-palette';

import AlbumSummary from '../../components/album/AlbumSummary';
import MainLayout from '../../layouts/MainLayout';
import TrackTable from '../../components/track/TrackTable';
import dummyData from '../../../album-dummy-data.json';

// TODO: Remove dummy data
const albumArtImgSrc = dummyData.images[0].url;
//const albumArtImgSrc =
//    'https://i.scdn.co/image/ab67616d00001e0273e509d7beb066e9746946d2';

const AlbumPage = () => {
    // Extract colors from artwork to use in album display
    const { data, loading, error } = usePalette(albumArtImgSrc);
    const primaryDarkColor =
        data && !loading && !error ? data.darkVibrant : 'inherit';
    const primaryLightColor =
        data && !loading && !error ? data.lightVibrant : 'inherit';

    return (
        <Box>
            <AlbumSummary
                primaryDarkColor={primaryDarkColor}
                primaryLightColor={primaryLightColor}
            />
            <TrackTable primaryLightColor={primaryLightColor} />
        </Box>
    );
};

AlbumPage.Layout = MainLayout;

export default AlbumPage;
