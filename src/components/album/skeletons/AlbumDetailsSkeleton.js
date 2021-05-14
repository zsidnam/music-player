import { Container, Box } from '@material-ui/core';

import AlbumSummarySkeleton from './AlbumSummarySkeleton';
import AlbumTracksSkeleton from './AlbumTracksSkeleton';

const AlbumDetailsSkeleton = () => {
    return (
        <>
            <AlbumSummarySkeleton />
            <Container maxWidth={'lg'}>
                <Box px={5} mb={6}>
                    <AlbumTracksSkeleton />
                </Box>
            </Container>
        </>
    );
};

export default AlbumDetailsSkeleton;
