import { Box, Typography, Grid, Container, Button, useTheme, makeStyles } from '@material-ui/core';
import AlbumIcon from '@material-ui/icons/Album';

import RecentSearch from './RecentSearch';
import ColorizedContainer from '../common/ColorizedContainer';
import { useSearchContext } from '../../context/searchContext';

const useStyles = makeStyles(() => ({
    noHistoryContainer: {
        marginTop: '35vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    titleText: {
        fontSize: '4rem',
    },
    albumIcon: {
        fontSize: '5rem',
    },
}));

const SearchPrompt = () => {
    const classes = useStyles();
    const theme = useTheme();
    const { recentSearches, removeRecentSearch, clearSearchHistory } = useSearchContext();

    if (recentSearches.length === 0) {
        return (
            <Container maxWidth={'lg'}>
                <Box className={classes.noHistoryContainer}>
                    <Box mb={2}>
                        <AlbumIcon className={classes.albumIcon} />
                    </Box>
                    <Typography variant={'h4'}>Search for an artist, album, or track.</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Box mb={10}>
            <ColorizedContainer primaryColor={theme.palette.common.grey} maxWidth={'lg'}>
                <Box px={5} pb={5} pt={16}>
                    <Typography className={classes.titleText} variant={'h3'}>
                        Recent Searches
                    </Typography>
                </Box>
            </ColorizedContainer>

            <Container maxWidth={'lg'}>
                <Box px={5} mb={6} pt={3}>
                    <Box mb={5}>
                        <Grid container spacing={3}>
                            {recentSearches.map((searchProps) => (
                                <Grid key={searchProps.href} item xs={12}>
                                    <RecentSearch {...searchProps} onClear={removeRecentSearch} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Button variant={'outlined'} color={'secondary'} onClick={clearSearchHistory}>
                        Clear All Searches
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

SearchPrompt.propTypes = {};

export default SearchPrompt;
