import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import TextLink from '../common/TextLink';
import { getUrlFromSpotifyUri } from '../../utils/spotify-data';

const ArtistLinks = ({ artists, TypographyProps, onMouseOver, useUri, className }) => {
    return artists.map((artist, idx) => {
        const isLastItem = idx === artists.length - 1;
        const href = useUri ? getUrlFromSpotifyUri(artist.uri) : `/artists/${artist.id}`;

        const optionalProps = {};
        if (onMouseOver) {
            optionalProps.onMouseOver = () => onMouseOver(useUri ? artist.uri : artist.id);
        }

        return (
            <Fragment key={useUri ? artist.uri : artist.id}>
                <TextLink
                    text={artist.name + (!isLastItem ? ',' : '')}
                    href={href}
                    className={className}
                    TypographyProps={TypographyProps}
                    {...optionalProps}
                />
                {!isLastItem && <Box mr={1} />}
            </Fragment>
        );
    });
};

ArtistLinks.propTypes = {
    useUri: PropTypes.bool,
    artists: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            uri: PropTypes.string,
            name: PropTypes.string,
        })
    ).isRequired,
};

export default ArtistLinks;
