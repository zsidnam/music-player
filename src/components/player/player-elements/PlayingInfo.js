import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Grid, Box, makeStyles } from '@material-ui/core';

import TextLink from '../../common/TextLink';

// Note: In order to get text to not wrap, we need the parent
// container to have a width set. In order to simulate responsive
// behavior of Grid, we can use a calculation for the width based on
// the viewport size.
const useStyles = makeStyles((theme) => ({
    albumArtLink: {
        '&:hover': {
            cursor: 'pointer',
            outline: `1px solid ${theme.palette.common.lightGrey}`,
        },
    },
    noWrapTextContainer: {
        width: 'calc(1px + 15vw)',
        minWidth: 150,
        maxWidth: 225,
    },
}));

const _getAlbumId = (albumUri) => {
    const uriParts = albumUri.split(':');
    return uriParts[uriParts.length - 1];
};

// TODO: memoize

const PlayingInfo = ({ currentTrack }) => {
    const classes = useStyles();

    if (!currentTrack) {
        return null;
    }

    const { name, artists, album } = currentTrack;
    const albumId = _getAlbumId(album.uri);
    const smallestImgUrl = album.images.length
        ? [...album.images].sort((a, b) => a.width - b.width)[0].url
        : null;

    return (
        <Grid container alignItems={'center'} spacing={2} wrap={'nowrap'}>
            <Grid item>
                <Link href={`/albums/${albumId}`}>
                    <img
                        width={50}
                        height={50}
                        src={smallestImgUrl}
                        className={classes.albumArtLink}
                    />
                </Link>
            </Grid>
            <Grid item>
                <Grid container direction={'column'}>
                    <Grid item xs zeroMinWidth>
                        <Box className={classes.noWrapTextContainer}>
                            <TextLink
                                text={name}
                                href={'/search'}
                                TypographyProps={{
                                    noWrap: true,
                                    variant: 'h6',
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Box
                            className={classes.noWrapTextContainer}
                            style={{ display: 'flex' }}
                        >
                            {
                                // TODO: Fix spacing issue
                                artists.map((artist) => (
                                    <TextLink
                                        key={artist.uri}
                                        text={artist.name}
                                        href={'/search'}
                                        TypographyProps={{
                                            noWrap: true,
                                            variant: 'caption',
                                            // Caption variant renders a span which will not work
                                            // for the noWrap look
                                            component: 'h6',
                                        }}
                                    />
                                ))
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

PlayingInfo.propTypes = {
    currentTrack: PropTypes.shape({
        name: PropTypes.string,
        artists: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                uri: PropTypes.string,
            })
        ),
        album: PropTypes.shape({
            name: PropTypes.string,
            uri: PropTypes.string,
            images: PropTypes.arrayOf(
                PropTypes.shape({
                    width: PropTypes.number,
                    height: PropTypes.number,
                    url: PropTypes.string,
                })
            ),
        }),
    }),
};

export default PlayingInfo;
