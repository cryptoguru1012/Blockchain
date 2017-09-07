import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SET_VIEW = 'base/SET_VIEW';

export const setView = createAction(SET_VIEW); // view

const initialState = Map({

  view: 'wallet', //personal, wallet
});

export default handleActions({
  [SET_VIEW]: (state, action) => state.set('view', action.payload),

}, initialState);
