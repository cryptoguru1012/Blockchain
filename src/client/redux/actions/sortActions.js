import axios from 'axios';
import { FETCH_OFFERS, SORT_OFFERS } from './types';
import { reset } from 'redux-form';

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
        console.log(error);
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
        console.log(err);
      });
  };
}

export function sortOffers({ currency, name, geolocation, category, btc, sys, zec }) {
  return (dispatch) => {
    axios
      .get('/API/offers/sort', {
        params: { currency, name, geolocation, category, btc, sys, zec },
      })
      .then((response) => {
        dispatch({ type: SORT_OFFERS, payload: response.data });
        dispatch(reset('sorter'));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
