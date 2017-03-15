export const SET_RECORD = 'SET_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';
export const SET_SUBTITLES = 'SET_SUBTITLES';

export function setRecord(url, recorded) {
    return (dispatch, getState) => {
        dispatch({
            type: SET_RECORD,
            url: url
        });
    }
}

export function deleteRecord() {
    return (dispatch, getState) => {
        dispatch({
            type: DELETE_RECORD
        });
    }
}

export function setSubtitles(subtitles) {
    return (dispatch, getState) => {
        dispatch({
            type: DELETE_RECORD,
            subtitles: subtitles
        });
    }
}