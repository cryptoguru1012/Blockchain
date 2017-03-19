import {
	ITEM_CREATE_ERR,
	ITEM_CREATE_START,
	ITEM_CREATE_SUCCESS,
	SHOW_SNACKBAR,
} from '../../actions/store/new_item';

const initialState = {
	loading: false,
	error: null,
	success: false,
	message: '',
	showSnackbar: false,
	payments: [
		{id: 1, value: 'Paypal', text: 'Paypal'},
		{id: 2, value: 'Credit Card', text: 'Credit Card'},
		{id: 3, value: 'Bitcoin', text: 'Bitcoin'}
	],
	currencies: [
		{id: 1, value: 'USD', text: 'USD'},
		{id: 2, value: 'EUR', text: 'EUR'}
	]
};

export default function categoryReducer(state = initialState, action) {
	switch (action.type) {
		case ITEM_CREATE_ERR:
			return { ...state, error: true, loading: false, message: action.message, showSnackbar: true };

		case ITEM_CREATE_START:
			return { ...state, loading: true };

		case ITEM_CREATE_SUCCESS:
			return { ...state, success: true, error: false, loading: false };

		case SHOW_SNACKBAR:
			return { ...state, showSnackbar: false };

		default:
			return state;
	}
}

