import { LOAD_START, LOAD_ERROR, LOAD_SUCCESS } from '../actions/image';

const initialState = {
	error: false,
	loading: false,
	message: null,
	uploaded: false,
	data: {}
};

const imageReducers = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_START:
			return { ...state, loading: true };

		case LOAD_ERROR:
			return { ...state, uploaded:false, error: true, loading: false, message: action.message };

		case LOAD_SUCCESS:
			return { ...state, uploaded:true, error: false, loading: false, data: action.data };

		default:
			return state;
	}
}

export default imageReducers;