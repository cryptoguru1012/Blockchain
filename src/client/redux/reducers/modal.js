import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SHOW = 'modal/SHOW';
const HIDE = 'modal/HIDE';
const CHANGE = 'modal/CHANGE';

export const show = createAction(SHOW); // {mode, contact:{[id],name, account, color}}
export const hide = createAction(HIDE);
export const change = createAction(CHANGE); // {name, value}


const initialState = Map({
  visible: false,
  mode: null, // create, modify
  wallet: Map({
    id: null,
    name: '',
    account: '',
    color: 'black',
    url: '',
  }),

});

export default handleActions({
  [SHOW]: (state, action) => {
    const { mode, wallet } = action.payload;

    return state.set('visible', true)
                    .set('mode', mode)
                    .set('wallet', Map(wallet));
  },
  [HIDE]: state => state.set('visible', false),
  [CHANGE]: (state, action) => {
    const { name, value } = action.payload;
    return state.setIn(['wallet', name], value);
  },
}, initialState)
;
