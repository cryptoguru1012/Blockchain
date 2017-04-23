import 'whatwg-fetch';
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const FILTER_SEARCH = 'FILTER_SEARCH';

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

export function setFilter(filter) {
	return (dispatch, getState) => {
		console.log('filter: ', filter);
		let items = getState().browser.items;
		items.sort((a, b) => {
			if ( a[filter] < b[filter] )
				return -1;
			if ( a[filter] > b[filter] )
				return 1;
			return 0;
		});
		dispatch({
			type: FILTER_SEARCH,
			items: items
		});
	}
}

export function search(data) {
	return (dispatch, getState) => {
		dispatch(searchStart());

		var esc = encodeURIComponent;
		var query = Object.keys(data)
			.map(k => esc(k) + '=' + esc(data[k]))
			.join('&');

		fetch("https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62")
			.then(res => res.json())
			.then((res) => {
				var token = res.token;
				return fetch("https://d2fzm6xoa70bg8.cloudfront.net/offerfilter?" + query, {
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