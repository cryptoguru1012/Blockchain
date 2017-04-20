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

function setFormatTime(arr) {
	console.log('arr:',arr);
	let newArr = [];
	arr.map(a => {
		a.startTime = setTimetoSeconds(a.startTime);
		a.endTime = setTimetoSeconds(a.endTime);
	});
	console.log('newArr',arr);
	return arr;
}

function setTimetoSeconds(value) {
	let output = 0
		, match = value.match(/([0-9]{2}\:[0-9]{2}\:[0-9]{2}\,[0-9]{3})/);

	if (match) {
		value = value.split(':');
		let h = parseInt(value[0]) * 3600
		, m = parseInt(value[1]) * 60
		, s = parseFloat(value[2].replace(',', '.'));

		output = h + m + s;
	}
	return output;
}

const videoReducers = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_RECORD:
			return { ...state, localUrl: null, recorded: false };

		case UPLOAD_START:
			return { ...state, localUrl: action.url, loading: true };

		case UPLOAD_ERROR:
			return { ...state, error: true, loading: false };

		case UPLOAD_SUCCESS:
			return { ...state, url: action.payload.videoLink, recorded: true, error: false, loading: false, subtitles: setFormatTime(action.payload.videoSubs) };

		case SET_OFFER:
			return { ...state, videoUploaded: true };

		case UPDATE_SUBTITLES:
			return { ...state, subtitles: action.subtitles };

		default:
			return state;
	}
}

export default videoReducers;