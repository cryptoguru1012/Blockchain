import 'whatwg-fetch';

export const CURRENCY_REQ_START = 'CURRENCY_REQ_START';
export const CURRENCY_REQ_ERR = 'CURRENCY_REQ_ERR';
export const CURRENCY_REQ_SUCCESS = 'CURRENCY_REQ_SUCCESS';

function currencyReqStart() {
  return {
    type: CURRENCY_REQ_START,
  };
}

function currencyReqErr() {
  return {
    type: CURRENCY_REQ_ERR,
  };
}

function currencyReqSuccess(res) {
  return {
    type: CURRENCY_REQ_SUCCESS,
    payload: res.rates,
  };
}

export function doCurrencyReq() {
  return (dispatch, state) => {
    dispatch(currencyReqStart());

  /* fetch("https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62")
    .then(res => res.json())
    .then(res => {
      let token = res.token;
      fetch('https://d2fzm6xoa70bg8.cloudfront.net/aliasinfo?aliasname=sysrates.peg', {
        headers: {
          'Token': token
        },
        mode: 'cors',
        method: "GET"
      })
      .then(res => res.json())
      .then(res => {
        let data = JSON.parse(res.value);
        data.rates = data.rates.filter(function(rate){
          return ["SYS", "BTC", "ZEC"].indexOf(rate.currency) !== -1
        })
        dispatch(currencyReqSuccess(data))
      })
      .catch(error => {
        dispatch(currencyReqErr(error))
      });
    })
    .catch(error => {
      dispatch(currencyReqErr(error))
    }); */
  };
}
