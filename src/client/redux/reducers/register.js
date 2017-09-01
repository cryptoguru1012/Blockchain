import { REGISTER_ERROR, REGISTER_START, REGISTER_SUCCESS, SHOW_SNACKBAR } from '../actions/auth';

const initialState = {
  success: false,
  error: null,
  loading: false,
  message: '',
  showSnackbar: false,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START:
      return { ...state, loading: true };

    case REGISTER_ERROR:
      return { ...state, error: true, loading: false, message: action.message, showSnackbar: true };

    case REGISTER_SUCCESS:
      return { ...state, error: false, loading: false, success: true, message: action.message };

    case SHOW_SNACKBAR:
      return { ...state, showSnackbar: false };

    default:
      return state;
  }
};

export default registerReducer;

