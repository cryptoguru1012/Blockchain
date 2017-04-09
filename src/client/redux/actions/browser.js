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
		type: SEARCH_ERROR
	};
}

function searchSuccess(payload) {
	return { 
		type: SEARCH_SUCCESS
	};
}

export function search(data) {
	return (dispatch, getState) => {
		dispatch(searchStart());

		fetch("http://ec2-35-167-150-241.us-west-2.compute.amazonaws.com:8001/offernew", {
			"headers": {
				"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiZTQwMzFkZTM2ZjQ1YWYyMTcyZmE4ZDBmMDU0ZWZjZGQ4ZDRkZmQ2MiIsImlhdCI6MTQ5MDgxMzIxOSwiZXhwIjoxNDkwODE0NjU5fQ.OTTk3AphMXRYFY6suvt57o5gxdCnLqejZHWTedpC3eo",
			},
			"method": "GET",
			"body": '',
		})
		.then(res => {
			if (res.status === 200)
				dispatch(searchSuccess(res));
			else
				dispatch(searchError());
		})
		.catch(error => {
			dispatch(searchError());
		});
	};
}