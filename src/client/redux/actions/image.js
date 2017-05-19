import 'whatwg-fetch';
export const LOAD_START = 'LOAD_START';
export const LOAD_ERROR = 'LOAD_ERROR';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';


function loadStart(payload) {
	return {
		type: LOAD_START
	};
}

function loadError(payload) {
	return {
		type: LOAD_ERROR,
		message: payload
	};
}

function loadSuccess(payload) {
	return { 
		type: LOAD_SUCCESS,
		data: payload
	};
}

export function setImage(data) {
	return (dispatch, getState) => {
		dispatch(loadStart());
		fetch('https://d3j22jloo6hpq6.cloudfront.net/API/upload', {
			method: "POST",
			mode: 'cors',
			body: data
		})
		.then(res => res.json())
		.then(res => {
			if (typeof res !== 'object') {
				return dispatch(loadError(res));
			} else {
				return dispatch(loadSuccess(res[0]));
			}
		})
		.catch(error => dispatch(loadError(error)));
	};
}