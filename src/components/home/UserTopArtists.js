import { useQuery } from '@apollo/client';

import ArtistList from '../artist/ArtistList';
import ArtistListSkeleton from '../artist/skeletons/ArtistListSkeleton';
import { USER_TOP_ARTISTS_QUERY } from '../../graphql/queries/user';

const UserTopArtists = () => {
    const { loading, error, data } = useQuery(USER_TOP_ARTISTS_QUERY);

    if (loading) return <ArtistListSkeleton />;

    return (
        <ArtistList
            artists={data.userTopArtists.items}
            title={'Your Top Artists'}
            noResultsMessage={'You do not have any top artists.'}
            error={error}
            errorMessage={'Unable to get your top artists.'}
        />
    );
};

export default UserTopArtists;
