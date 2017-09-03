import axios from 'axios';
import { reset } from 'redux-form';

import { FETCH_OFFERS, SORT_OFFERS, FETCH_OFFER, GET_FILTER } from './types';

export function paginateOffers(indexPosition, numberOfItems) {
  return (dispatch) => {
    axios
      .get('/API/offers/pagination', {
        params: {
          position: indexPosition,
          number: numberOfItems,
        },
      })
      .then((response) => {
        dispatch({ type: FETCH_OFFERS, payload: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

export function fetchOffers() {
  return (dispatch) => {
    axios
      .get('/API/offers')
      .then((response) => {
        dispatch({ type: FETCH_OFFERS, payload: response.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function fetchOffer(id) {
  return (dispatch) => {
    axios
      .get(`/API/offers/${id}`)
      .then((response) => {
        dispatch({ type: FETCH_OFFER, payload: response.data.result });
      })
      .catch((err) => {
        console.error(`ERROR: ${err}`);
      });
  };
}

export function sortOffers({ currency, name, geolocation, category, btc, sys, zec }) {
  return dispatch => axios
      .get('/API/offers/sort', {
        params: { currency, name, geolocation, category, btc, sys, zec },
      })
      .then((response) => {
        dispatch({ type: SORT_OFFERS, payload: response.data });
        dispatch(reset('sorter'));
      })
      .catch((err) => {
        console.error(err);
      });
}

export function getFilterOption(option) {
  return (dispatch) => {
    dispatch({
      type: GET_FILTER,
      option,
    });
  };
}
