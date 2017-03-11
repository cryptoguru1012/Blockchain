import { SET_RECORD, DELETE_RECORD } from '../actions/video';

const initialState = {
	url: null,
	isRecorded: false
};

const videoReducers = (state = initialState, action) => {
	switch (action.type) {
		case SET_RECORD:
			return { ...state, url: action.url, isRecorded: true };
		case DELETE_RECORD:
			return { ...state, url: null, isRecorded: false };
		default:
			return state;
	}
}

export default videoReducers;