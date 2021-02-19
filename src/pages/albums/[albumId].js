import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

import AlbumDetails from '../../components/album/AlbumDetails';
import MainLayout from '../../layouts/MainLayout';

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
                    album
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

    // TODO: Update error handling
    const { loading, error, data } = useQuery(ALBUM_QUERY, {
        variables: {
            id: albumId,
        },
    });

    // TODO: Add skeleton
    if (loading) return <p>Loading...</p>;

    // TODO: Redirect/Display error message
    if (error) return <p>There was an error</p>;

    return <AlbumDetails album={data.album} />;
};

AlbumPage.Layout = MainLayout;

export default AlbumPage;
