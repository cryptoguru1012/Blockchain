export const ITEM_CREATE_START = 'ITEM_CREATE_START';
export const ITEM_CREATE_ERR = 'ITEM_CREATE_ERR';
export const ITEM_CREATE_SUCCESS = 'ITEM_CREATE_SUCCESS';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';

function itemCreateStart() {
  return { type: ITEM_CREATE_START };
}

function itemCreateErr(payload) {
  return { type: ITEM_CREATE_ERR, message: payload.message };
}

function itemCreateSuccess(res) {
  return { type: ITEM_CREATE_SUCCESS, payload: res.data };
}

export function showSnackbar() {
  return { type: SHOW_SNACKBAR };
}

export function doItemCreate(params) {
  return (dispatch, state) => {
    dispatch(itemCreateStart());

    fetch('/API/store/item', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(params),
    })
      .then(res => res.json())
      .then((res) => {
        if (!res.success) {
          dispatch(itemCreateErr(res));
        } else {
          dispatch(itemCreateSuccess(res));
        }
      });
  };
}

