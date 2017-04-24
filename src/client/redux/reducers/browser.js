import { SEARCH_START, SEARCH_ERROR, SEARCH_SUCCESS, ORDER_SEARCH, SET_VISIBILITY_FILTER } from '../actions/browser';

const initialState = {
	error: null,
	loading: false,
	message: '',
	dataItems: [],
	items: [],
	filter: 'SHOW_ALL'
};

const browserReducers = (state = initialState, action) => {
	switch (action.type) {
		case SEARCH_START:
			return { ...state, loading: true };

		case SEARCH_ERROR:
			return { ...state, error: true, loading: false, message: action.message };

		case SEARCH_SUCCESS:
			return { ...state, error: false, loading: false, dataItems: action.items, items: action.items };

		case ORDER_SEARCH:
			return { ...state, items: action.items };

		case SET_VISIBILITY_FILTER:
			return { ...state, items: action.items, filter: action.filter };

		default:
			return state;
	}
}

export default browserReducers;