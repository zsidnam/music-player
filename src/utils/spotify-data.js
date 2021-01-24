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

    const volume = _get(webApiPlayerState, 'device.volume_percent');
    const shuffle = _get(webApiPlayerState, 'shuffle_state');
    const repeat_mode = _getRepeatSettingFromAPI(
        _get(webApiPlayerState, 'repeat_state')
    );
    const position = _get(webApiPlayerState, 'progress_ms');
    const paused = !_get(webApiPlayerState, 'is_playing');
    const duration = _get(webApiPlayerState, 'item.duration_ms');
    const track_window = {
        current_track: {
            name: _get(webApiPlayerState, 'item.name'),
            artists: _get(webApiPlayerState, 'item.artists', []).map(
                (artist) => ({
                    name: artist.name,
                    uri: artist.uri,
                })
            ),
            album: _get(webApiPlayerState, 'item.album', {}),
        },
    };

    return {
        volume,
        shuffle,
        repeat_mode,
        position,
        paused,
        duration,
        track_window,
    };
};

export const getPlayerStateFromWebPlayer = (webPlayerState) => {
    //
};
