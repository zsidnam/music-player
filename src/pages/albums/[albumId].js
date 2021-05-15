import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import AlbumDetails from '../../components/album/AlbumDetails';
import MainLayout from '../../layouts/MainLayout';
import AlbumDetailsSkeleton from '../../components/album/skeletons/AlbumDetailsSkeleton';
import { ALBUM_QUERY } from '../../graphql/queries/album';

const AlbumPage = () => {
    const router = useRouter();
    const { albumId } = router.query;

    const { loading, error, data } = useQuery(ALBUM_QUERY, {
        variables: {
            id: albumId,
        },
    });

    if (loading) return <AlbumDetailsSkeleton />;

    if (error) {
        router.push('/client-error');
        return null;
    }

    return <AlbumDetails album={data.album} />;
};

AlbumPage.Layout = MainLayout;

export default AlbumPage;
