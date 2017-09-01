import 'whatwg-fetch';
import axios from 'axios';

export const DELETE_RECORD = 'DELETE_RECORD';
export const UPLOAD_START = 'UPLOAD_START';
export const UPLOAD_ERROR = 'UPLOAD_ERROR';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const SET_OFFER = 'SET_OFFER';
export const UPDATE_SUBTITLES = 'UPDATE_SUBTITLES';
export const SET_VIDEO_DURATION = 'SET_VIDEO_DURATION';

function uploadStart(payload) {
  return {
    type: UPLOAD_START,
    url: payload,
  };
}

function uploadError(payload) {
  return {
    type: UPLOAD_ERROR,
    payload: payload.data,
  };
}

function uploadSuccess(payload) {
  return {
    type: UPLOAD_SUCCESS,
    payload: payload.data,
  };
}

export function setDuration(payload) {
  return {
    type: SET_VIDEO_DURATION,
    duration: payload,
  };
}

export function deleteRecord(payload) {
  return (dispatch) => {
    dispatch({
      type: DELETE_RECORD,
      deleted: payload,
    });
  };
}

export function setOfferForm() {
  return (dispatch) => {
    dispatch({
      type: SET_OFFER,
    });
  };
}

export function updateSubtitles(subtitles) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_SUBTITLES,
      subtitles,
    });
  };
}

// https://d3j22jloo6hpq6.cloudfront.net/API/parse
// https://shopshots-argvil19.c9users.io/API/parse

export function setRecord(data, url) {
  return (dispatch) => {
    dispatch(uploadStart(url));
    // This is a hack to check if data is the FormData which composed from formdata-polyfill
    // If yes, convert it to native FormData
    const nativeData = data._asNative ? data._asNative() : data;

    axios
      .post('/API/videos/create', nativeData)
      .then((response) => {
        if (!response.success) {
          dispatch(uploadError(null));
        } else {
          dispatch(uploadSuccess(response.data));
        }
      })
      .catch(() => {
        dispatch(uploadError(null));
      });
  };
}
