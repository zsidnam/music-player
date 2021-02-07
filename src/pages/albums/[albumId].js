import { Box } from '@material-ui/core';

import AlbumSummary from '../../components/album/AlbumSummary';
import MainLayout from '../../layouts/MainLayout';
import TrackTable from '../../components/track/TrackTable';

const AlbumPage = () => {
    return (
        <Box>
            <AlbumSummary />
            <TrackTable />
        </Box>
    );
};

AlbumPage.Layout = MainLayout;

export default AlbumPage;
