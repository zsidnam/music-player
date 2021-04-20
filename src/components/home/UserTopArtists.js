import { useQuery, gql } from '@apollo/client';

import ArtistList from '../artist/ArtistList';
import ArtistListSkeleton from '../artist/skeletons/ArtistListSkeleton';

const USER_TOP_ARTISTS_QUERY = gql`
    query GetUserTopArtists($limit: Int, $offset: Int) {
        userTopArtists(limit: $limit, offset: $offset) {
            items {
                id
                uri
                name
                images {
                    width
                    height
                    url
                }
            }
        }
    }
`;

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
