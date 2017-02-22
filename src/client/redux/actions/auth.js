export const REGISTER_START = 'REGISTER_START';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

function registerStart() {
	return {
		type: REGISTER_START
	};
};

function registerError(err) {
	return {
		type: REGISTER_ERROR,
		payload: err
	};
};

function registerSuccess(payload) {
	return {
		payload,
		type: REGISTER_SUCCESS
	};
};

export function doRegister(params) {
	return (dispatch, getState) => {
		console.log(params);
		dispatch(registerStart());
		fetch('/API/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params),
		}).then(res => res.json()).then(res => {
			dispatch(res);
		});
	};
};
