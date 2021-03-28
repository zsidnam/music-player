import { Box, Typography, useTheme, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import ColorizedContainer from '../../common/ColorizedContainer';

const useStyles = makeStyles((theme) => ({
    titleText: {
        fontSize: '4rem',
        maxWidth: '70%',
    },
    container: {
        height: 300,
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: theme.palette.common.nearBlack,
    },
}));

const ArtistSummarySkeleton = () => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <ColorizedContainer maxWidth={'lg'} primaryColor={theme.palette.common.darkGrey}>
            <Box px={5} pb={5} pt={12}>
                <Box className={classes.container}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-end'}>
                        <Typography variant={'h3'} className={classes.titleText}>
                            <Skeleton width={500} />
                        </Typography>

                        <Box mb={1}>
                            <Skeleton variant={'circle'} width={'3rem'} height={'3rem'} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ColorizedContainer>
    );
};

export default ArtistSummarySkeleton;
