import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

import AlbumDetails from '../../components/album/AlbumDetails';
import MainLayout from '../../layouts/MainLayout';
import AlbumDetailsSkeleton from '../../components/album/skeletons/AlbumDetailsSkeleton';

const ALBUM_QUERY = gql`
    query GetAlbum($id: ID!) {
        album(id: $id) {
            id
            uri
            name
            release_date
            total_tracks
            copyrights {
                text
                type
            }
            images {
                height
                width
                url
            }
            artists {
                id
                name
            }
            tracks {
                items {
                    id
                    name
                    duration_ms
                    track_number
                    uri
                    album {
                        id
                        name
                    }
                    artists {
                        id
                        name
                    }
                }
            }
        }
    }
`;

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
