import { combineReducers }                  from 'redux';
import { reducer as reduxAsyncConnect }     from 'redux-connect';
import { showItems }                        from './items';
import registerReducer                      from './register';

export default combineReducers({
    reduxAsyncConnect,
    items: showItems,
    register: registerReducer
});
