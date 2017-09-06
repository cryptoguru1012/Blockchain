import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';


const MODIFY = 'wallets/MODIFY';
const REMOVE = 'wallets/REMOVE';
const TOGGLE_FAVORITE = 'wallet/TOGGLE_FAVORITE';

export const modify = createAction(MODIFY); // {id, wallet:{name, account}}
export const remove = createAction(REMOVE); // id
export const toggleFavorite = createAction(TOGGLE_FAVORITE);

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
  [REMOVE]: (state, action) => {
    const index = state.findIndex(wallet => wallet.get('id') === action.payload);
    return state.delete(index);
  },
  [MODIFY]: (state, action) => {
    const index = state.findIndex(wallet => wallet.get('id') === action.payload.id);
    return state.mergeIn([index], action.payload.wallet);
  },
  [TOGGLE_FAVORITE]: (state, action) => {
    const index = state.findIndex(wallet => wallet.get('id') === action.payload);
    return state.update(index, wallet => wallet.set('favorite', !wallet.get('favorite')));
  },

}, initialState);

