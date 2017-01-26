import { combineReducers }                  from 'redux';
import { reducer as reduxAsyncConnect }     from 'redux-connect';

export default combineReducers({
    reduxAsyncConnect,
    testReducer: (state={}, action) => {
        return state;
    }
});
