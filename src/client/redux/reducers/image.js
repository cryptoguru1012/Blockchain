import { LOAD_START, LOAD_ERROR, LOAD_SUCCESS, SET_OFFER } from '../actions/image';

const initialState = {
	error: false,
	success: false,
	loading: false,
	message: null,
	imageUploaded: false,
	data: {}
};

const imageReducers = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_START:
			return { ...state, loading: true };

		case LOAD_ERROR:
			return { ...state, error: true, loading: false, message: action.message };

		case LOAD_SUCCESS:
			return { ...state, success: true, loading: false, data: action.data };

		case SET_OFFER:
			return { ...state, imageUploaded: true };

		default:
			return state;
	}
}

export default imageReducers;