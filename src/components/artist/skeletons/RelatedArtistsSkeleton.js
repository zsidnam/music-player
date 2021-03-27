import { Box, Typography, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const NUM_ROWS = 7;

const RelatedArtistsSkeleton = () => {
    return (
        <Box>
            <Box mb={2}>
                <Typography variant={'overline'}>
                    <Skeleton width={150} />
                </Typography>
            </Box>

            <Grid container direction={'column'} spacing={2}>
                {Array(NUM_ROWS)
                    .fill(null)
                    .map((_, idx) => (
                        <Grid key={idx} item xs={12}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Box mr={2}>
                                    <Skeleton variant={'circle'} width={45} height={45} />
                                </Box>
                                <Typography variant={'h6'}>
                                    <Skeleton width={150} />
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default RelatedArtistsSkeleton;
