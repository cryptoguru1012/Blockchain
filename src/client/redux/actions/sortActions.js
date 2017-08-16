import axios from 'axios';
import { FETCH_OFFERS, SORT_OFFERS } from './types';

export function fetchOffers(indexPosition, numberOfItems) {
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

export function sortOffers({ title, price, quantity, currency }) {
  return (dispatch) => {
    axios
      .get('/API/offers/sort', {
        params: { title, price, quantity, currency },
      })
      .then((response) => {
        dispatch({ type: SORT_OFFERS, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
