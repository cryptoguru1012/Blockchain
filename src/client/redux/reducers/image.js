import { LOAD_START, LOAD_ERROR, LOAD_SUCCESS, DELETE_IMAGE, PROCEED } from '../actions/image';

const initialState = {
  error: false,
  loading: false,
  message: null,
  loaded: false,
  proceed: false,
  data: {},
};

const imageReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_START:
      return { ...state, loading: true };

    case LOAD_ERROR:
      return { ...state, loaded: false, error: true, loading: false, message: action.message };

    case LOAD_SUCCESS:
      return { ...state, loaded: true, error: false, loading: false, data: action.data };

    case DELETE_IMAGE:
      return { ...state, loaded: false };

    case PROCEED:
      return { ...state, proceed: true, loaded: true };

    default:
      return state;
  }
};

export default imageReducers;
