import { useQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';

import TrackTable, { COLUMNS } from '../../components/track/TrackTable';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { SCROLLABLE_CONTENT_CONTAINER_ID } from '../../utils/constants';
import AlbumTracksSkeleton from './skeletons/AlbumTracksSkeleton';
import { playContext } from '../../services/spotify-api';

const TRACK_PAGE_SIZE = 15;

const ALBUM_TRACKS_QUERY = gql`
    query GetAlbumTracks($albumId: ID!, $limit: Int, $offset: Int) {
        albumTracks(albumId: $albumId, limit: $limit, offset: $offset) {
            next
            items {
                id
                uri
                name
                duration_ms
                track_number
                artists {
                    id
                    name
                }
            }
        }
    }
`;

const AlbumTracks = ({ albumId, primaryColor, albumUri }) => {
    const { loading, error, data, fetchMore } = useQuery(ALBUM_TRACKS_QUERY, {
        variables: {
            albumId,
            limit: TRACK_PAGE_SIZE,
            offset: 0,
        },
    });

    const handleLoadMore = () => {
        return fetchMore({
            variables: { offset: data?.albumTracks?.items?.length },
        });
    };

    useInfiniteScroll(handleLoadMore, !!data?.albumTracks?.next, SCROLLABLE_CONTENT_CONTAINER_ID);

    const handleTrackPlay = (trackNumber) => {
        playContext(albumUri, trackNumber);
    };

    if (loading) return <AlbumTracksSkeleton />;

    // TODO: Redirect/Display error message
    if (error) return <p>There was an error</p>;

    return (
        <TrackTable
            tracks={data.albumTracks.items}
            primaryColor={primaryColor}
            contextUri={albumUri}
            columns={[COLUMNS.TRACK_NUMBER, COLUMNS.TITLE, COLUMNS.TIME]}
            onTrackPlay={handleTrackPlay}
        />
    );
};

AlbumTracks.propTypes = {
    albumId: PropTypes.string.isRequired,
    albumUri: PropTypes.string.isRequired,
    primaryColor: PropTypes.string.isRequired,
    albumUri: PropTypes.string.isRequired,
};

export default AlbumTracks;
