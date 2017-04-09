import { SEARCH_START, SEARCH_ERROR, SEARCH_SUCCESS } from '../actions/browser';

const initialState = {
	error: null,
	loading: false,
	items: []
};

const browserReducers = (state = initialState, action) => {
	switch (action.type) {
		case SEARCH_START:
			return { ...state, loading: true };

		case SEARCH_ERROR:
			return { ...state, error: true, loading: false };

		case SEARCH_SUCCESS:
			return { ...state, error: false, loading: false, items: action.items };

		default:
			return state;
	}
}

export default browserReducers;