import { DELETE_RECORD, UPLOAD_START, UPLOAD_ERROR, UPLOAD_SUCCESS, SET_OFFER } from '../actions/video';

const initialState = {
	url: null,
	error: null,
	recorded: false,
	loading: false,
	subtitles: [],
	videoUploaded: false
};

const videoReducers = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_RECORD:
			return { ...state, url: null };

		case UPLOAD_START:
			return { ...state, url: action.url, loading: true };

		case UPLOAD_ERROR:
			return { ...state, error: true, loading: false };

		case UPLOAD_SUCCESS:
			return { ...state, recorded: true, error: false, loading: false, subtitles: action.subtitles };

		case SET_OFFER:
			return { ...state, videoUploaded: true };

		default:
			return state;
	}
}

export default videoReducers;