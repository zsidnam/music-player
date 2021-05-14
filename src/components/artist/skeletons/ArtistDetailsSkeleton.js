import { Box, Container, Grid } from '@material-ui/core';

import ArtistSummarySkeleton from './ArtistSummarySkeleton';
import TopTracksSkeleton from '../../track/skeletons/TopTracksSkeleton';
import ArtistListSkeleton from './ArtistListSkeleton';
import DiscographySkeleton from './DiscographySkeleton';

const ArtistDetailsSkeleton = () => {
    return (
        <Box mb={10}>
            <ArtistSummarySkeleton />

            <Container maxWidth={'lg'}>
                <Box px={5} mb={6}>
                    <Box mb={4}>
                        <Grid container spacing={5}>
                            <Grid item xs={7} md={8}>
                                <TopTracksSkeleton />
                            </Grid>
                            <Grid item xs={5} md={4}>
                                <ArtistListSkeleton />
                            </Grid>
                        </Grid>
                    </Box>

                    <DiscographySkeleton />
                </Box>
            </Container>
        </Box>
    );
};

export default ArtistDetailsSkeleton;
