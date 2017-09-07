import { LOAD_START, LOAD_ERROR, LOAD_SUCCESS } from '../actions/offer';

const initialState = {
  error: false,
  success: false,
  loading: false,
  message: null,
  data: {},
};

const offerReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_START:
      return { ...state, loading: true };

    case LOAD_ERROR:
      return { ...state, error: true, loading: false, message: action.message };

    case LOAD_SUCCESS:
      return { ...state, success: true, loading: false, data: action.data };

    default:
      return state;
  }
};

export default offerReducers;
