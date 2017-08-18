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
  return (dispatch) => {
    dispatch(loadStart());
    fetch('https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62')
      .then(res => res.json())
      .then((res) => {
        const token = res.token;
        fetch(`https://d2fzm6xoa70bg8.cloudfront.net/offerinfo?guid=${guid}`, {
          headers: {
            Token: token,
          },
          mode: 'cors',
          method: 'GET',
        })
          .then(result => result.json())
          .then((reslt) => {
            if (typeof reslt === 'string') {
              dispatch(loadError(reslt));
            } else {
              dispatch(loadSuccess(reslt));
            }
          })
          .catch((error) => {
            dispatch(loadError(error));
          });
      })
      .catch((error) => {
        dispatch(loadError(error));
      });
  };
}
