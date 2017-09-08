import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';


const MODIFY = 'personal/MODIFY';
const SET_VALUE = 'personal/SET_VALUE';


export const modify = createAction(MODIFY);
export const setValue = createAction(SET_VALUE); // {value}


const initialState = Map({
  id: 'SyKw5cyAl',
  name: 'Abderlahman mohamed',
  email: 'Abderlahman.man@hotmail.com',
  alias: 'Abdelrahman.m',
  value: 1,
  password: '*************',
  publicaddress: '120 moutclam road, surrey bc, v2g 5f6',
  shippingaddress: '120 moutclam road, surrey bc, v2g 5f6',
  phonenumber: '',
  yutube: true,
  twitter: false,
  facebok: true,
});


export default handleActions({
  [MODIFY]: (state, action) => state.mergeIn(action.payload.contact),
  [SET_VALUE]: (state, action) => state.set('value', action.payload),

}, initialState);

