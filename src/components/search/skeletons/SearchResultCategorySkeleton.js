import PropTypes from 'prop-types';
import { Box, Typography, Divider, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const NUM_RECORDS = 5;

const SearchResultCategorySkeleton = ({ circularFrame, hasSecondaryText }) => {
    return (
        <Box>
            <Typography variant={'overline'}>
                <Skeleton width={100} />
            </Typography>

            <Box mb={2}>
                <Divider />
            </Box>

            <Grid container spacing={3}>
                {Array(NUM_RECORDS)
                    .fill(null)
                    .map((_, idx) => (
                        <Grid key={idx} item xs={12}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Skeleton
                                    style={{ flex: 'none' }}
                                    variant={circularFrame ? 'circle' : 'rect'}
                                    width={60}
                                    height={60}
                                />

                                <Box ml={2} flex={1}>
                                    <Typography variant={'h6'}>
                                        <Skeleton width={'75%'} />
                                    </Typography>

                                    {hasSecondaryText && (
                                        <Typography variant={'caption'}>
                                            <Skeleton width={'50%'} />
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

SearchResultCategorySkeleton.propTypes = {
    circularFrame: PropTypes.bool,
    hasSecondaryText: PropTypes.bool,
};

export default SearchResultCategorySkeleton;
