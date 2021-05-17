import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import ArtistListSkeleton from './skeletons/ArtistListSkeleton';
import ArtistList from './ArtistList';
import { RELATED_ARTISTS_QUERY } from '../../graphql/queries/artist';

const RelatedArtists = ({ artistId }) => {
    const { loading, error, data } = useQuery(RELATED_ARTISTS_QUERY, {
        variables: { artistId },
    });

    if (loading) return <ArtistListSkeleton />;

    return (
        <ArtistList
            artists={data.relatedArtists.artists}
            title={'Related Artists'}
            noResultsMessage={'This artist does not have any related artists.'}
            error={error}
            errorMessage={'Unable to get related artists.'}
        />
    );
};

RelatedArtists.propTypes = {
    artistId: PropTypes.string.isRequired,
};

export default RelatedArtists;
