import { DELETE_RECORD, UPLOAD_START, UPLOAD_ERROR, UPLOAD_SUCCESS, SET_OFFER, UPDATE_SUBTITLES } from '../actions/video';

const initialState = {
	url: null,
	error: null,
	recorded: false,
	loading: false,
	// subtitles: [],
	subtitles: [
		{
			id: 1,
			startTime: '00:00:01,244',
			endTime: '00:00:05,345',
			text: 'Hello my name is Lorem\nand ...'
		},
		{
			id: 2,
			startTime: '00:00:06,754',
			endTime: '00:00:07,323',
			text: 'Lorem ipsum\ndolor sit amet.'
		}
	],
	videoUploaded: false
};

const videoReducers = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_RECORD:
			return { ...state, url: null, recorded: false };

		case UPLOAD_START:
			return { ...state, url: action.url, loading: true };

		case UPLOAD_ERROR:
			// return { ...state, error: true, loading: false };
			return { ...state, recorded: true, error: false, loading: false };

		case UPLOAD_SUCCESS:
			return { ...state, recorded: true, error: false, loading: false, subtitles: action.subtitles };

		case SET_OFFER:
			return { ...state, videoUploaded: true };

		case UPDATE_SUBTITLES:
			return { ...state, subtitles: action.subtitles };

		default:
			return state;
	}
}

export default videoReducers;