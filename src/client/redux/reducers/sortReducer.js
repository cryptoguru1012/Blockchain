import { FETCH_OFFERS, SORT_OFFERS, FETCH_OFFER, GET_FILTER } from '../actions/types';
import { SET_VISIBILITY_FILTER } from '../actions/browser';

const initialState = {
  list: [],
  filter: [],
  offer: {},
  option: 'SHOW_VIDEOS',
};

export default function (state = initialState, action) {
  const updatedState = Object.assign({}, state);

  switch (action.type) {
    case FETCH_OFFERS:
      updatedState.list = action.payload;
      return updatedState;

    case SORT_OFFERS:
      updatedState.list = action.payload;
      return updatedState;

    case SET_VISIBILITY_FILTER:
      updatedState.filter = action.items;
      return updatedState;

    case FETCH_OFFER:
      updatedState.offer = action.payload;
      return updatedState;

    case GET_FILTER:
      updatedState.option = action.option;
      return updatedState;

    default:
      return state;
  }
}
