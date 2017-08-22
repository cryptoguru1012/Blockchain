import 'whatwg-fetch';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';

function registerStart() {
  return { type: REGISTER_START };
}

function registerError(payload) {
  return { type: REGISTER_ERROR, message: payload.message };
}

function registerSuccess(payload) {
  return { type: REGISTER_SUCCESS, message: payload.message };
}

export function showSnackbar() {
  return { type: SHOW_SNACKBAR };
}

export function doRegister(params) {
  return (dispatch) => {
    dispatch(registerStart());
    fetch('/API/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
      .then(res => res.json())
      .then((res) => {
        if (!res.success) {
          dispatch(registerError(res));
        } else {
          dispatch(registerSuccess(res));
        }
      });
  };
}

