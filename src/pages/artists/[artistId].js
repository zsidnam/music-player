import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

import MainLayout from '../../layouts/MainLayout';
import ArtistDetails from '../../components/artist/ArtistDetails';
import ArtistDetailsSkeleton from '../../components/artist/skeletons/ArtistDetailsSkeleton';

const ARTIST_QUERY = gql`
    query GetArtist($id: ID!) {
        artist(id: $id) {
            id
            name
            uri
            images {
                height
                width
                url
            }
        }
    }
`;

const ArtistPage = () => {
    const router = useRouter();
    const { artistId } = router.query;
    const { loading, error, data } = useQuery(ARTIST_QUERY, {
        variables: {
            id: artistId,
        },
    });

    if (loading) return <ArtistDetailsSkeleton />;

    if (error) {
        router.push('/client-error');
        return null;
    }

    return <ArtistDetails artist={data.artist} />;
};

ArtistPage.Layout = MainLayout;

export default ArtistPage;
