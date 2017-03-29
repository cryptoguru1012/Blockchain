import 'whatwg-fetch';
export const ITEM_CREATE_START = 'ITEM_CREATE_START';
export const ITEM_CREATE_ERR = 'ITEM_CREATE_ERR';
export const ITEM_CREATE_SUCCESS = 'ITEM_CREATE_SUCCESS';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';

function itemCreateStart() {
	return { type: ITEM_CREATE_START };
}

function itemCreateErr(payload) {
	return { type: ITEM_CREATE_ERR, message: payload.statusText };
}

function itemCreateSuccess(res) {
	return { type: ITEM_CREATE_SUCCESS, payload: res.data };
}

export function showSnackbar() {
	return { type: SHOW_SNACKBAR };
}

export function doItemCreate(params) {
	return (dispatch, state) => {
		console.log(params);
		dispatch(itemCreateStart());

		fetch("http://ec2-35-167-150-241.us-west-2.compute.amazonaws.com:8001/offernew", {
			"headers": {
				"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiZTQwMzFkZTM2ZjQ1YWYyMTcyZmE4ZDBmMDU0ZWZjZGQ4ZDRkZmQ2MiIsImlhdCI6MTQ5MDgxMzIxOSwiZXhwIjoxNDkwODE0NjU5fQ.OTTk3AphMXRYFY6suvt57o5gxdCnLqejZHWTedpC3eo",
				"content-type": "application/json",
			},
			"method": "POST",
			"body": params,
		})
		.then(res => {
			if (res.status === 200)
				dispatch(itemCreateSuccess(res));
			else
				dispatch(itemCreateErr(res));
		})
		.catch(error => {
			dispatch(itemCreateErr({message: error}));
		});
	};
};
