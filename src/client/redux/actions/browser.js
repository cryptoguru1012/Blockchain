import 'whatwg-fetch';
import geolib from 'geolib';
import axios from 'axios';

export const SEARCH_START = 'SEARCH_START';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const FEATURE_START = 'FEATURE_START';
export const FEATURE_ERROR = 'FEATURE_ERROR';
export const FEATURE_SUCCESS = 'FEATURE_SUCCESS';
export const ORDER_SEARCH = 'ORDER_SEARCH';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

function searchStart(payload) {
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

function clusterItems(items) {
  let hasVideo = [],
    hasPhoto = [],
    hasOnlyText = [],
    hasAudio = [];

  items.map((item, i) => {
    const media = JSON.parse(item.description).media.mediaVault;
    if (media.length > 0) {
      media.map((mediaItem, i) => {
        switch (mediaItem.mediaType) {
          case 'img':
            return hasPhoto.push(item);
          case 'vid':
            return hasVideo.push(item);
          case 'aud':
            return hasAudio.push(item);
          default:
            return hasOnlyText.push(item);
        }
      });

      return;
    }
    hasOnlyText.push(item);
  });

  return {
    SHOW_ALL: items,
    SHOW_VIDEOS: hasVideo,
    SHOW_PHOTOS: hasPhoto,
    SHOW_TEXT: hasOnlyText,
    SHOW_MAP: items,
  };
}

export function setVisibilityFilter(filter) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_VISIBILITY_FILTER,
      items: clusterItems(getState().sorter.list)[filter],
      filter,
    });
  };
}

export function setOrder(order) {
  return (dispatch, getState) => {
    const items = Object.assign([], getState().browser.items);
    if (order == 'geolocation') {
      const locations = [];
      const coords = { latitude: '', longitude: '' };

      items.map((value, i) => {
        const newGeoArr = value.geolocation.split(',');
        const coordsObj = Object.assign({}, coords);
        if (newGeoArr.length < 2 || newGeoArr === '') {
          console.log(
            'One of these items do not have geolocation and therefore geolocation will not work',
          );
          coordsObj.latitude = 0;
          coordsObj.longitude = 0;
          locations.push(coordsObj);
          return;
        }
        console.log('Items that had geolocation will be added to the search');
        coordsObj.latitude = newGeoArr[0];
        coordsObj.longitude = newGeoArr[1];
        locations.push(coordsObj);
      });

      const newLocations = locations.reduce((acc, cur, i) => ({ ...acc, [i]: cur }), {});

      const currentLocation = {};

      fetch('http://ip-api.com/json').then(res => res.json()).then((data) => {
        currentLocation.latitude = data.lat;
        currentLocation.longitude = data.lon;
        const distance = geolib.orderByDistance(currentLocation, newLocations);
        console.log('distance', distance);

        items.map((itemValue, i) => {
          distance.map((distanceValue, i) => {
            items[distanceValue.key].distanceFromUser = distanceValue.distance / 1609.34;
            if (items[distanceValue.key].geolocation.length < 1) {
              items[distanceValue.key].distanceFromUser = undefined;
            }
          });
        });

        items.sort(
          (a, b) =>
            (a.distanceFromUser == undefined) - (b.distanceFromUser == undefined) ||
            a.distanceFromUser - b.distanceFromUser,
        );

        dispatch({
          type: ORDER_SEARCH,
          items,
        });
      });
    }

    items.sort((a, b) => {
      if (String(a[order]).toUpperCase() < String(b[order]).toUpperCase()) return -1;
      if (String(a[order]).toUpperCase() > String(b[order]).toUpperCase()) return 1;
      return 0;
    });
    dispatch({
      type: ORDER_SEARCH,
      items,
    });
  };
}

export function getFeatures() {
  return (dispatch) => { // return (dispatch, getState)
    dispatch(getFeaturesStart());

    axios
      .get('https://d3ocj7sd2go46j.cloudfront.net/API/featured')
      .then(response => dispatch(getFeaturesSuccess(response.data)))
      .catch(error => dispatch(getFeaturesError(error)));
  };
}

export function search(data){
  const data2search = data.regexp;
  // const getURL = data2search ? `/API/offers/search/${data2search}` : '/API/offers';
  const getURL = `/API/offers/search/${data2search}`;
  console.log('getURL: ', getURL);
  return (dispatch) => {
    axios
      .get(getURL)
      .then((response) => {
        // const items = data2search ? response.data.result : response.data;
        const items = response.data.result;
        console.log('Items: ', items);
        dispatch({ type: ORDER_SEARCH, items });
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };
}
