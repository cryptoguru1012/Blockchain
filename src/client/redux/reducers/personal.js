import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';


const MODIFY = 'contacts/MODIFY';


export const modify = createAction(MODIFY); // {id, contact:{name, phone}}


const initialState = Map({
  id: 'SyKw5cyAl',
  name: 'Abderlahman mohamed',
  email: 'Abderlahman.man@hotmail.com',
  alias: 'Abdelrahman.m',
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

}, initialState);

