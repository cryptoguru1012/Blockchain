import 'whatwg-fetch';
export const LOAD_START = 'LOAD_START';
export const LOAD_ERROR = 'LOAD_ERROR';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const SET_OFFER = 'SET_OFFER';


function loadStart(payload) {
	console.log('loadStart');
	return {
		type: LOAD_START
	};
}

function loadError(payload) {
	console.log('loadError');
	return {
		type: LOAD_ERROR,
		message: payload
	};
}

function loadSuccess(payload) {
	console.log('loadSuccess');
	return { 
		type: LOAD_SUCCESS,
		data: payload
	};
}

export function setOfferForm() {
	return (dispatch, getState) => {
		dispatch({
			type: SET_OFFER
		});
	}
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
			if (!res.files) {
				dispatch(loadError(null));
			} else {
				dispatch(loadSuccess(res));
			}
		})
		.catch(error => {
			dispatch(loadError(null));
		});
	};
}