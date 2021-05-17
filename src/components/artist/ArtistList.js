import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@material-ui/core';
import { motion } from 'framer-motion';

import Thumbnail from '../common/Thumbnail';
import { usePrefetch } from '../../hooks/usePrefetch';
import {
    ARTIST_QUERY,
    RELATED_ARTISTS_QUERY,
    TOP_TRACKS_QUERY,
} from '../../graphql/queries/artist';

const DEFAULT_ARTISTS_TO_SHOW = 8;

// Spotify returns images in order of widest -> smallest
const _getSmallestImgSrc = (images) => (images.length ? images[images.length - 1].url : null);

const RelatedArtists = ({
    title,
    artists,
    noResultsMessage,
    numRecordsToShow,
    error,
    errorMessage,
}) => {
    const prefetch = usePrefetch();
    const handleMouseEnter = (artistId) => {
        prefetch([
            {
                query: ARTIST_QUERY,
                variables: { id: artistId },
            },
            {
                query: RELATED_ARTISTS_QUERY,
                variables: { artistId },
            },
            {
                query: TOP_TRACKS_QUERY,
                variables: { artistId },
            },
        ]);
    };

    const artistsToDisplay = numRecordsToShow > 0 ? artists.slice(0, numRecordsToShow) : artists;
    const titleBlock = !title ? null : (
        <Box mb={2}>
            <Typography variant={'overline'}>{title}</Typography>
        </Box>
    );

    if (error) {
        return (
            <>
                {titleBlock}
                <Typography color={'textSecondary'}>{errorMessage || 'Error.'}</Typography>
            </>
        );
    }

    return (
        <>
            {titleBlock}
            {!artists.length ? (
                <Typography color={'textSecondary'}>{noResultsMessage || 'No results.'}</Typography>
            ) : (
                <Grid container direction={'column'} spacing={2}>
                    {artistsToDisplay.map((artist) => (
                        <Grid key={artist.id} item xs={12}>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                onMouseEnter={() => handleMouseEnter(artist.id)}
                            >
                                <Thumbnail
                                    href={`/artists/${artist.id}`}
                                    imageSrc={_getSmallestImgSrc(artist.images)}
                                    primaryText={artist.name}
                                    circularFrame
                                    imageSize={45}
                                />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

RelatedArtists.defaultProps = {
    numRecordsToShow: DEFAULT_ARTISTS_TO_SHOW,
};

RelatedArtists.propTypes = {
    title: PropTypes.string,
    noResultsMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    numRecordsToShow: PropTypes.number,
    error: PropTypes.object,
    artists: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            images: PropTypes.arrayOf(
                PropTypes.shape({
                    width: PropTypes.number.isRequired,
                    height: PropTypes.number.isRequired,
                    url: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
};

export default RelatedArtists;
