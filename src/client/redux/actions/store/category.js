import 'whatwg-fetch';
export const CATEGORY_REQ_START = 'CATEGORY_REQ_START';
export const CATEGORY_REQ_ERR = 'CATEGORY_REQ_ERR';
export const CATEGORY_REQ_SUCCESS = 'CATEGORY_REQ_SUCCESS';

function categoryReqStart() {
	return {
		type: CATEGORY_REQ_START
	};
};

function categoryReqErr() {
	return {
		type: CATEGORY_REQ_ERR
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

		fetch("http://ec2-35-167-150-241.us-west-2.compute.amazonaws.com:8001/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62")
		.then(res => res.json())
		.then(res => {
			let token = res.token;
			fetch('http://ec2-35-167-150-241.us-west-2.compute.amazonaws.com:8001/aliasinfo?aliasname=syscategory', {
				headers: {
					'Token': token
				},
				mode: 'cors',
				method: "GET"
			})
			.then(res => res.json())
			.then(res => {
				let data = JSON.parse(res.value);
				dispatch(categoryReqSuccess(data))
			})
			.catch(error => {
				dispatch(categoryReqErr(error))
			});
		})
		.catch(error => {
			dispatch(categoryReqErr(error))
		});
	};
};