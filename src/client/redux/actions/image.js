/* import Config from 'configEnv'; */

import 'whatwg-fetch';
import axios from 'axios';

export const LOAD_START = 'LOAD_START';
export const LOAD_ERROR = 'LOAD_ERROR';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const DELETE_IMAGE = 'DELETE_IMAGE';
export const PROCEED = 'PROCEED';

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
    dispatch({ type: LOAD_START });

    // This is a hack to check if data is the FormData which composed from formdata-polyfill
    // If yes, convert it to native FormData
    const nativeData = data._asNative ? data._asNative() : data;

    axios
      .post('/API/images/create', nativeData)
      .then((res) => {
        if (typeof res.data !== 'object') {
          return dispatch({ type: LOAD_ERROR, message: res.data });
        }
        return dispatch({ type: LOAD_SUCCESS, data: res.data[0] });
      })
      .catch((error) => {
        dispatch({ type: LOAD_ERROR, message: error });
      });
  };
}
