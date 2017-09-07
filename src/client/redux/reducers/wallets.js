import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';


const SEND = 'wallets/SEND';
const RECEIVE = 'wallet/RECEIVE';

export const send = createAction(SEND); // {id, wallet:{name, account}}
export const receive = createAction(RECEIVE);

const initialState = List([
  Map({
    id: 'SyKw5cyAl',
    name: 'SYS Wallet',
    account: '00.000SYS - $0.0',
    color: '#f79828',
    btncolor: '#f79828',
    url: 'BTCicon',
  }),
  Map({
    id: 'r1s_9c10l',
    name: 'BTC Wallet',
    account: '00.000BTC - $0.0',
    color: '#0094da',
    btncolor: '#0094da',
    url: 'SYSicon',
  }),
  Map({
    id: 'BJcFqc10l',
    name: 'ZEC Wallet',
    account: '00.000ZEC - $0.0',
    color: '#000',
    btncolor: '#d9952e',
    url: 'ZECicon',
  }),
]);

export default handleActions({
  [SEND]: (state, action) => {
    const index = state.findIndex(wallet => wallet.get('id') === action.payload.id);
    return state.mergeIn([index], action.payload.wallet);
  },
  [RECEIVE]: (state, action) => {
    const index = state.findIndex(wallet => wallet.get('id') === action.payload);
    return state.update(index, wallet => wallet.set('send', !wallet.get('send')));
  },

}, initialState);

