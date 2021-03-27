import { Box, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const NUM_ALBUMS = 8;

const DiscographySkeleton = () => {
    return (
        <Box>
            <Box mb={2}>
                <Typography variant={'overline'}>
                    <Skeleton width={75} />
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {Array(NUM_ALBUMS)
                    .fill(null)
                    .map((_, idx) => (
                        <Grid key={idx} item xs={3} lg={2}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Skeleton variant={'rect'} height={175} />

                                <Typography>
                                    <Skeleton style={{ maxWidth: 175 }} />
                                </Typography>

                                <Typography variant={'caption'}>
                                    <Skeleton width={50} />
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default DiscographySkeleton;
