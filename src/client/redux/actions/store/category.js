import 'whatwg-fetch';
export const CATEGORY_REQ_START = 'CATEGORY_REQ_START';
export const CATEGORY_REQ_ERR = 'CATEGORY_REQ_ERR';
export const CATEGORY_REQ_SUCCESS = 'CATEGORY_REQ_SUCCESS';

function categoryReqStart() {
	return {
		type: CATEGORY_REQ_START
	};
};

function categoryReqErr(payload) {
	return {
		type: CATEGORY_REQ_ERR,
		message: payload
	};
};

function categoryReqSuccess(res) {
	return {
		type: CATEGORY_REQ_SUCCESS,
		payload: res.categories
	};
};

export function doCategoryReq() {
	return (dispatch, state) => {
		
		dispatch(categoryReqStart());

		fetch("https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62")
			.then(res => res.json())
			.then(res => {
				let token = res.token;
				return fetch('https://d2fzm6xoa70bg8.cloudfront.net/aliasinfo?aliasname=syscategory', {
					headers: {
						'Token': token
					},
					mode: 'cors',
					method: "GET"
				})
			})
			.then(res => res.json())
			.then(res => {
				if (typeof res === 'object') {
					let data = JSON.parse(res.value);

					return dispatch(categoryReqSuccess(data));
				} else {
					return dispatch(categoryReqErr(res));
				}
			})
			.catch(error => dispatch(categoryReqErr(error)));
	};
};