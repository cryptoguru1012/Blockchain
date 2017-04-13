import { DELETE_RECORD, UPLOAD_START, UPLOAD_ERROR, UPLOAD_SUCCESS, SET_OFFER, UPDATE_SUBTITLES } from '../actions/video';

const initialState = {
	localUrl: null,
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
			return { ...state, localUrl: null, recorded: false };

		case UPLOAD_START:
			return { ...state, localUrl: action.url, loading: true };

		case UPLOAD_ERROR:
			return { ...state, error: true, loading: false };

		case UPLOAD_SUCCESS:
			return { ...state, url: action.payload.videoLink, recorded: true, error: false, loading: false, subtitles: action.payload.videoSubs };

		case SET_OFFER:
			return { ...state, videoUploaded: true };

		case UPDATE_SUBTITLES:
			return { ...state, subtitles: action.subtitles };

		default:
			return state;
	}
}

export default videoReducers;