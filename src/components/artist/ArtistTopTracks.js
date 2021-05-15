import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import TrackTable, { COLUMNS } from '../track/TrackTable';
import TopTracksSkeleton from '../track/skeletons/TopTracksSkeleton';
import { playTracks } from '../../services/spotify-api';
import { TOP_TRACKS_QUERY } from '../../graphql/queries/artist';

const ArtistTopTracks = ({ artistId, primaryColor }) => {
    const { loading, error, data } = useQuery(TOP_TRACKS_QUERY, { variables: { artistId } });

    if (loading) return <TopTracksSkeleton />;

    if (error) {
        return (
            <>
                <Box mb={2}>
                    <Typography variant={'overline'}>Top Tracks</Typography>
                </Box>
                <Typography color={'textSecondary'}>
                    Unable to get top tracks for artist.
                </Typography>
            </>
        );
    }

    const { tracks } = data.topTracks;

    const handleTrackPlay = async (trackIndex) => {
        // Spotify does not allow you to provide an offset when playing a top-tracks context,
        // so unlike playing a specific song on an album or playlist, we need to explicitly
        // provide any other song uris we want to enter the play queue.
        const tracksToPlay = [...tracks.slice(trackIndex), ...tracks.slice(0, trackIndex)].map(
            (t) => t.uri
        );
        playTracks(tracksToPlay);
    };

    return (
        <>
            <Box mb={2}>
                <Typography variant={'overline'}>Top Tracks</Typography>
            </Box>

            {!tracks.length ? (
                <Typography color={'textSecondary'}>
                    This artist does not have any top tracks.
                </Typography>
            ) : (
                <TrackTable
                    tracks={tracks}
                    primaryColor={primaryColor}
                    indexAsTrackNumber
                    disableTableHead
                    columns={[COLUMNS.ALBUM_ART, COLUMNS.TRACK_NUMBER, COLUMNS.TITLE]}
                    onTrackPlay={handleTrackPlay}
                />
            )}
        </>
    );
};

ArtistTopTracks.propTypes = {
    artistId: PropTypes.string.isRequired,
    primaryColor: PropTypes.string,
};

export default ArtistTopTracks;
