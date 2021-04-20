import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@material-ui/core';

import Thumbnail from '../common/Thumbnail';

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
                            <Thumbnail
                                href={`/artists/${artist.id}`}
                                imageSrc={_getSmallestImgSrc(artist.images)}
                                primaryText={artist.name}
                                circularFrame
                                imageSize={45}
                            />
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
