import Config from 'config_env';

import 'whatwg-fetch';

export const SEARCH_START = 'SEARCH_START';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const FEATURE_START = 'FEATURE_START';
export const FEATURE_ERROR = 'FEATURE_ERROR';
export const FEATURE_SUCCESS = 'FEATURE_SUCCESS';
export const ORDER_SEARCH = 'ORDER_SEARCH';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

function searchStart() {
  return {
    type: SEARCH_START,
  };
}

function searchError(payload) {
  return {
    type: SEARCH_ERROR,
    message: payload,
  };
}

function searchSuccess(raw, filtered) {
  return {
    type: SEARCH_SUCCESS,
    dataItems: raw,
    items: filtered,
  };
}

function getFeaturesStart() {
  return {
    type: FEATURE_START,
  };
}

function getFeaturesError(payload) {
  return {
    type: FEATURE_ERROR,
    message: payload,
  };
}

function getFeaturesSuccess(payload) {
  return {
    type: FEATURE_SUCCESS,
    items: payload.data,
  };
}


function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * Filter offers returned fromm offerfilter API based on media
 */
function clusterItems(items) {
  const hasVideo = [];
  const hasPhoto = [];
  const hasOnlyText = [];

  items.map((item) => {
    const description = item.description;

    if (isJson(description)) {
      hasVideo.push(item);
    } else if (description.match(/https?:\/\/.*\.(?:png|jpg|gif)/g)) {
      hasPhoto.push(item);
    } else {
      hasOnlyText.push(item);
    }
    return item;
  });

  return ({
    SHOW_ALL: items,
    SHOW_VIDEOS: hasVideo,
    SHOW_PHOTOS: hasPhoto,
    SHOW_TEXT: hasOnlyText,
  });
}

export function setVisibilityFilter(filter) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_VISIBILITY_FILTER,
      items: clusterItems(getState().browser.dataItems)[filter],
      filter,
    });
  };
}

export function setOrder(order) {
  return (dispatch, getState) => {
    const items = Object.assign([], getState().browser.items);
    items.sort((a, b) => {
      if (String(a[order]).toUpperCase() < String(b[order]).toUpperCase()) {
        return -1;
      }
      if (String(a[order]).toUpperCase() > String(b[order]).toUpperCase()) {
        return 1;
      }
      return 0;
    });
    dispatch({
      type: ORDER_SEARCH,
      items,
    });
  };
}

/**
 * Get featured items for carousel
 */
export function getFeatures() {
	return (dispatch, getState) => {
		let featured = Config.CloudFront.featured;
		dispatch(getFeaturesStart());
		fetch(featured)
			.then(res => res.json())
			.then(res => dispatch(getFeaturesSuccess(res)))
			.catch(error => dispatch(getFeaturesError(error)));
	}
}

/**
 * Get offer items from syscoin offerfilter API
 */
export function search(data) {
	return (dispatch, getState) => {
		let login = Config.CloudFront.login;
		let offerFilter = Config.CloudFront.offerFilter;
		dispatch(searchStart());
		var esc = encodeURIComponent;
		var query = Object.keys(data)
			.map(k => {
				let a = esc(k)
					, b = (data[k]) ? '=' + esc(data[k]) : '';
				return a + b
			})
			.join(esc('&'));
			
		fetch(login)
			.then(res => res.json())
			.then(res => {
				var token = res.token;
				return fetch(`${offerFilter}${query}`, {
					"headers": {
						"Token": token,
					},
					mode: 'cors',
					"method": "GET",
				})
			})
			.then(res => res.json())
			.then(res => {
				if (typeof res === 'object') {
					let filter = getState().browser.filter
						, filtered = clusterItems(res)[filter];

    fetch('https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62')
      .then(res => res.json())
      .then((res) => {
        const token = res.token;
        return fetch(`https://d2fzm6xoa70bg8.cloudfront.net/offerfilter?${query}`, {
          headers: {
            Token: token,
          },
          mode: 'cors',
          method: 'GET',
        });
      })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          const filter = getState().browser.filter;
          const filtered = clusterItems(res)[filter];

          return dispatch(searchSuccess(res, filtered));
        }
        return dispatch(searchError(res));
      })
      .catch(error => dispatch(searchError(error)));
  };
}
