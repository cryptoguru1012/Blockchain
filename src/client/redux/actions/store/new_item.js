import 'whatwg-fetch';
import axios from 'axios';

export const ITEM_CREATE_START = 'ITEM_CREATE_START';
export const ITEM_CREATE_ERR = 'ITEM_CREATE_ERR';
export const ITEM_CREATE_SUCCESS = 'ITEM_CREATE_SUCCESS';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';

function itemCreateStart() {
  return {
    type: ITEM_CREATE_START,
  };
}

function itemCreateErr(payload) {
  return {
    type: ITEM_CREATE_ERR,
    message: payload,
  };
}

function itemCreateSuccess(payload) {
  return {
    type: ITEM_CREATE_SUCCESS,
    guid: payload[1],
  };
}

export function showSnackbar() {
  return {
    type: SHOW_SNACKBAR,
  };
}

export function doItemCreate(params) {
  return (dispatch) => {
    dispatch(itemCreateStart());

    axios
      .post('/API/offers/new', params)
      .then((response) => {
        if (typeof response.data !== 'string') {
          dispatch(itemCreateSuccess(response.data));
        } else dispatch(itemCreateErr(response.data));
      })
      .catch((error) => {
        dispatch(itemCreateErr(error));
      });
  };
}
