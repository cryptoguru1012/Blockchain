import { DELETE_RECORD, UPLOAD_START, UPLOAD_ERROR, UPLOAD_SUCCESS, SET_OFFER } from '../actions/video';

const initialState = {
	url: null,
	isRecorded: false,
	isLoading: false,
	subtitles: [],
	videoUploaded: false
};

const videoReducers = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_RECORD:
			return { ...state, url: null, isRecorded: false };
		case UPLOAD_START:
			return { ...state, url: action.url, isLoading: true };
		case UPLOAD_SUCCESS:
		case UPLOAD_ERROR:
			return { ...state, subtitles: action.subtitles, isRecorded: true, isLoading: false };
		case SET_OFFER:
			return { ...state, videoUploaded: true };
		default:
			return state;
	}
}

export default videoReducers;