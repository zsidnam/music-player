import _get from 'lodash.get';
import isEmpty from 'lodash.isempty';

// TODO: Clean this up and/or move to GraphQL
const apiRepeatToWebPlayerRepeatMap = {
    off: 0,
    track: 1,
    context: 2,
};

const _getRepeatSettingFromAPI = (webApiRepeatSetting) =>
    apiRepeatToWebPlayerRepeatMap[webApiRepeatSetting.toLowerCase()] || 0;

export const getPlayerStateFromAPI = (webApiPlayerState) => {
    if (!webApiPlayerState || isEmpty(webApiPlayerState)) return {};

    const shuffle = _get(webApiPlayerState, 'shuffle_state');
    const position = _get(webApiPlayerState, 'progress_ms');
    const paused = !_get(webApiPlayerState, 'is_playing');
    const duration = _get(webApiPlayerState, 'item.duration_ms');
    const context = _get(webApiPlayerState, 'context');
    const volume = (_get(webApiPlayerState, 'device.volume_percent') || 0) / 100;
    const repeat_mode = _getRepeatSettingFromAPI(_get(webApiPlayerState, 'repeat_state'));
    const track_window = {
        current_track: {
            name: _get(webApiPlayerState, 'item.name'),
            artists: _get(webApiPlayerState, 'item.artists', []).map((artist) => ({
                name: artist.name,
                uri: artist.uri,
            })),
            album: _get(webApiPlayerState, 'item.album', {}),
            uri: _get(webApiPlayerState, 'item.uri'),
        },
    };

    return {
        context,
        volume,
        shuffle,
        repeat_mode,
        position,
        paused,
        duration,
        track_window,
    };
};

export const getUrlFromSpotifyUri = (uri) => {
    if (!uri) return null;

    const uriParts = uri.split(':');
    if (uriParts.length !== 3) {
        return null;
    }

    const [_, type, id] = uriParts;
    switch (type) {
        case 'track': {
            // Not implemented yet
            return null;
        }

        case 'album': {
            return `/albums/${id}`;
        }

        case 'artist': {
            return `/artists/${id}`;
        }

        case 'playlist': {
            // Not implemented yet
            return null;
        }

        default: {
            return null;
        }
    }
};
