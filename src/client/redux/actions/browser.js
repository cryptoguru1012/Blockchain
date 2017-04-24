import 'whatwg-fetch';
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const ORDER_SEARCH = 'ORDER_SEARCH';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

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

function searchSuccess(raw, filtered) {
	return { 
		type: SEARCH_SUCCESS,
		dataItems: raw,
		items: filtered
	};
}

function clusterItems(items) {
	let hasVideo = []
		, hasPhoto = []
		, hasOnlyText = [];

	items.map(item => {
		let description = item.description;
		let images = [];
		let isJson = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test( description.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + description + ')');

		if (isJson)
			hasVideo.push(item);
		else
			if (description.match(/https?:\/\/.*\.(?:png|jpg|gif)/g))
				hasPhoto.push(item);
			else
				hasOnlyText.push(item);
	});

	return ({
		SHOW_ALL: items,
		SHOW_VIDEOS: hasVideo, 
		SHOW_PHOTOS: hasPhoto, 
		SHOW_TEXT: hasOnlyText
	})
}

export function setVisibilityFilter(filter) {
	return (dispatch, getState) => {
		dispatch({
			type: SET_VISIBILITY_FILTER,
			items: clusterItems(getState().browser.dataItems)[filter],
			filter
		});
	}
}

export function setOrder(order) {
	return (dispatch, getState) => {
		let items = getState().browser.dataItems;
		items.sort((a, b) => {
			if ( String(a[order]).toUpperCase() < String(b[order]).toUpperCase() )
				return -1;
			if ( String(a[order]).toUpperCase() > String(b[order]).toUpperCase() )
				return 1;
			return 0;
		});
		dispatch({
			type: ORDER_SEARCH,
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
			.then(res => {
				let filter = getState().browser.filter
					, filtered = clusterItems(res)[filter];

				return dispatch(searchSuccess(res, filtered))
			})
			.catch(error => dispatch(searchError(error)));
	};
}