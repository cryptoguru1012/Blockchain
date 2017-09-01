import 'whatwg-fetch';
import axios from 'axios';

export const LOAD_START = 'LOAD_START';
export const LOAD_ERROR = 'LOAD_ERROR';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';

export function getOfferData(id) {
  return (dispatch) => {
    dispatch({ type: LOAD_START });
    axios
      .get(`/API/offers/${id}`)
      .then((response) => {
        if (typeof response.data === 'string') {
          dispatch({ type: LOAD_ERROR, message: response.data });
        } else dispatch({ type: LOAD_SUCCESS, data: response.data });
      })
      .catch((error) => {
        dispatch({ type: LOAD_ERROR, message: error });
      });
  };
}
