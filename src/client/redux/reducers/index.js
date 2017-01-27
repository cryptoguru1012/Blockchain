import { combineReducers }                  from 'redux';
import { reducer as reduxAsyncConnect }     from 'redux-connect';
import { showItems }                        from './items';

export default combineReducers({
    reduxAsyncConnect,
    items: showItems
    // testReducer: (state={}, action) => {
    //     return state;
    // }
});
