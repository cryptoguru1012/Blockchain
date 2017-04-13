import 'whatwg-fetch';
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

function searchStart(payload) {
	return {
		type: SEARCH_START
	};
}

function searchError(payload) {
	return {
		type: SEARCH_ERROR,
		message: payload
	};
}

function searchSuccess(payload) {
	return { 
		type: SEARCH_SUCCESS,
		items: payload
	};
}

export function search(data) {
	return (dispatch, getState) => {
		dispatch(searchStart());

		var esc = encodeURIComponent;
		var query = Object.keys(data)
			.map(k => esc(k) + '=' + esc(data[k]))
			.join('&');

		fetch("http://ec2-35-167-150-241.us-west-2.compute.amazonaws.com:8001/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62")
			.then(res => res.json())
			.then((res) => {
				var token = res.token;
				return fetch("http://ec2-35-167-150-241.us-west-2.compute.amazonaws.com:8001/offerfilter?" + query, {
					"headers": {
						"Token": token,
					},
					mode: 'cors',
					"method": "GET",
				})
			})
			.then(res => res.json())
			.then(res => dispatch(searchSuccess(res)))
			.catch(error => dispatch(searchError(error)));
	};
}