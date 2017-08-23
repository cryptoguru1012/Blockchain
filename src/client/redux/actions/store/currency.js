import Config from 'config_env';
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
  return (dispatch) => {
    const login = Config.CloudFront.login;
    const rates = Config.CloudFront.rates;
    dispatch(currencyReqStart());
    fetch(login)
    .then(res => res.json())
    .then((res) => {
      const token = res.token;
      fetch(rates, {
        headers: {
          Token: token,
        },
        mode: 'cors',
        method: 'GET',
      })
      .then(ress => ress.json())
      .then((ress) => {
        const data = JSON.parse(ress.value);
        data.rates = data.rates.filter(rate => ['SYS', 'BTC', 'ZEC'].indexOf(rate.currency) !== -1);
        dispatch(currencyReqSuccess(data));
      })
      .catch((error) => {
        dispatch(currencyReqErr(error));
      });
    })
    .catch((error) => {
      dispatch(currencyReqErr(error));
    });
  };
}

