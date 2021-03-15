import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, makeStyles } from '@material-ui/core';

import TextLink from '../../common/TextLink';
import SafeLink from '../../common/SafeLink';

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

const _getAlbumId = (album) => {
    if (!album.uri) return null;
    const uriParts = album.uri.split(':');
    return uriParts[uriParts.length - 1];
};

const _getSmallestImageUrl = (album) => {
    if (!(album.images || []).length) return null;
    return [...album.images].sort((a, b) => a.width - b.width)[0].url;
};

const PlayingInfo = ({ currentTrack }) => {
    const classes = useStyles();

    if (!currentTrack) return null;

    const { name, album, artists } = currentTrack;
    const albumId = _getAlbumId(album);
    const smallestImgUrl = _getSmallestImageUrl(album);

    return (
        <Grid container alignItems={'center'} spacing={2} wrap={'nowrap'}>
            <Grid item>
                <SafeLink href={`/albums/${albumId}`}>
                    <img
                        width={50}
                        height={50}
                        src={smallestImgUrl}
                        className={classes.albumArtLink}
                    />
                </SafeLink>
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
                        <Box className={classes.noWrapTextContainer} style={{ display: 'flex' }}>
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
    // Uri is used in memoization check
    uri: PropTypes.string,
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

// Not a huge deal, but decided to cut down a bunch of unnecessary renders
// since current track does not update frequently (relative to playback)
function areEqual(prevProps, nextProps) {
    return prevProps.uri === nextProps.uri;
}

export default memo(PlayingInfo, areEqual);
