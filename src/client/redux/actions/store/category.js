import Config from 'config_env';
import 'whatwg-fetch';

export const CATEGORY_REQ_START = 'CATEGORY_REQ_START';
export const CATEGORY_REQ_ERR = 'CATEGORY_REQ_ERR';
export const CATEGORY_REQ_SUCCESS = 'CATEGORY_REQ_SUCCESS';

function categoryReqStart() {
  return {
    type: CATEGORY_REQ_START,
  };
}

function categoryReqErr(payload) {
  return {
    type: CATEGORY_REQ_ERR,
    message: payload,
  };
}

function categoryReqSuccess(res) {
  return {
    type: CATEGORY_REQ_SUCCESS,
    payload: res.categories,
  };
}

export function doCategoryReq() {
  return (dispatch) => {
    const login = Config.CloudFront.login;
    const categories = Config.CloudFront.categories;
    dispatch(categoryReqStart());
    fetch(login)
      .then(res => res.json())
      .then((res) => {
        const token = res.token;
        return fetch(categories, {
          headers: {
            Token: token,
          },
          mode: 'cors',
          method: 'GET',
        });
      })
      .then(ress => ress.json())
      .then((ress) => {
        if (typeof res === 'object') {
          const data = JSON.parse(ress.value);

          return dispatch(categoryReqSuccess(data));
        }
        return dispatch(categoryReqErr(ress));
      })
      .catch(error => dispatch(categoryReqErr(error)));
  };
}
