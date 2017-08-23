import Config from 'config_env';

import 'whatwg-fetch';

export const LOAD_START = 'LOAD_START';
export const LOAD_ERROR = 'LOAD_ERROR';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const DELETE_IMAGE = 'DELETE_IMAGE';
export const PROCEED = 'PROCEED';

/* eslint no-underscore-dangle: 0 */  // --> OFF
function loadStart() {
  return {
    type: LOAD_START,
  };
}

function loadError(payload) {
  return {
    type: LOAD_ERROR,
    message: payload,
  };
}

function loadSuccess(payload) {
  return {
    type: LOAD_SUCCESS,
    data: payload,
  };
}

export function deleteImage(payload) {
  return (dispatch) => {
    dispatch({
      type: DELETE_IMAGE,
      deleted: payload,
    });
  };
}


export function proceed(payload) {
  return (dispatch) => {
    dispatch({
      type: PROCEED,
      data: payload,
    });
  };
}

/**
 * Upload images to S3 storage
 */
export function setImage(data) {
  return (dispatch) => {
    const uploadImage = Config.CloudFront.uploadImage;
    dispatch(loadStart());

    // This is a hack to check if data is the FormData which composed from formdata-polyfill
    // If yes, convert it to native FormData
    const nativeData = data._asNative ? data._asNative() : data;

    fetch(uploadImage, {
      method: 'POST',
      mode: 'cors',
      body: nativeData,
    })
    .then(res => res.json())
    .then((res) => {
      if (typeof res !== 'object') {
        return dispatch(loadError(res));
      }
      return dispatch(loadSuccess(res[0]));
    })
    .catch(error => dispatch(loadError(error)));
  };
}
