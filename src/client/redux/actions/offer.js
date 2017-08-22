import Config from 'config_env';

import 'whatwg-fetch';

export const LOAD_START = 'LOAD_START';
export const LOAD_ERROR = 'LOAD_ERROR';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';

function loadStart() {
  return {
    type: LOAD_START,
  };
}

function loadError(payload) {
  return {
    type: LOAD_ERROR,
    message: payload,
  };
}

function loadSuccess(payload) {
  return {
    type: LOAD_SUCCESS,
    data: payload,
  };
}

/**
 * Get individual offer from offerfilter API
 */
export function getOfferData(guid) {
	return (dispatch, getState) => {
		let login = Config.CloudFront.login;
		let offerInfo = Config.CloudFront.offerInfo;
		dispatch(loadStart());
		fetch(login)
		.then(res => res.json())
		.then(res => {
			let token = res.token;
			fetch(`${offerInfo}${guid}`, {
				headers: {
					'Token': token
				},
				mode: 'cors',
				method: "GET"
			})
			.then(res => res.json())
			.then(res => {
				if (typeof res === 'string')
					dispatch(loadError(res))
				else
					dispatch(loadSuccess(res))
			})
			.catch(error => {
				dispatch(loadError(error))
			});
		})
		.catch(error => {
			dispatch(loadError(error))
		});
	};
}
