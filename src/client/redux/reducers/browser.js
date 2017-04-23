import { SEARCH_START, SEARCH_ERROR, SEARCH_SUCCESS, FILTER_SEARCH } from '../actions/browser';

const initialState = {
	error: null,
	loading: false,
	message: '',
	items: []
};

const browserReducers = (state = initialState, action) => {
	switch (action.type) {
		case SEARCH_START:
			return { ...state, loading: true };

		case SEARCH_ERROR:
			return { ...state, error: true, loading: false, message: action.message };

		case SEARCH_SUCCESS:
			return { ...state, error: false, loading: false, items: action.items };

		case FILTER_SEARCH:
			return { ...state, items: action.items };

		default:
			return state;
	}
}

export default browserReducers;