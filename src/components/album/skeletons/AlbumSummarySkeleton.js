import { Box, Typography, useTheme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import ColorizedContainer from '../../common/ColorizedContainer';

const AlbumSummarySkeleton = () => {
    const theme = useTheme();

    return (
        <ColorizedContainer maxWidth={'lg'} primaryColor={theme.palette.common.darkGrey}>
            <Box px={5} pb={5} pt={13}>
                <Box display={'flex'} alignItems={'center'}>
                    <Skeleton variant={'rect'} width={300} height={300} />

                    <Box ml={4} flex={1}>
                        <Typography
                            variant={'h3'}
                            style={{ fontSize: '2.5rem', lineHeight: '2.5rem' }}
                        >
                            <Skeleton width={'60%'} />
                        </Typography>

                        <Box mt={1}>
                            <Typography variant={'h4'}>
                                <Skeleton width={'40%'} />
                            </Typography>
                        </Box>

                        <Box mt={1}>
                            <Typography color={'textSecondary'} variant={'caption'}>
                                <Skeleton width={'20%'} />
                            </Typography>
                        </Box>

                        <Box mt={2}>
                            <Skeleton variant={'circle'} width={'3rem'} height={'3rem'} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ColorizedContainer>
    );
};

export default AlbumSummarySkeleton;
