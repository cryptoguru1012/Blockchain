import { FETCH_OFFERS, SORT_OFFERS } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_OFFERS:
      return action.payload;
    case SORT_OFFERS:
      return action.payload;
    default:
      return state;
  }
}
