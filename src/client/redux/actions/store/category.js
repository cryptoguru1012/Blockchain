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
        payload: res.data
    };
};

export function doCategoryReq() {
    return (dispatch, state) => {
        dispatch(categoryReqStart());

        fetch('/API/store/categories', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
            credentials: 'include'
        }).then(res => res.json()).then(res => {
            dispatch(categoryReqSuccess(res));
        });
    };
};
