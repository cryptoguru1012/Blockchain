import { SET_RECORD, DELETE_RECORD, SET_SUBTITLES } from '../actions/video';

const initialState = {
	url: null,
	isRecorded: false,
	subtitle: []
};

const videoReducers = (state = initialState, action) => {
	switch (action.type) {
		case SET_RECORD:
			return { ...state, url: action.url, isRecorded: true };
		case DELETE_RECORD:
			return { ...state, url: null, isRecorded: false };
		case SET_SUBTITLES:
			return { ...state, subtitle: action.subtitles };
		default:
			return state;
	}
}

export default videoReducers;