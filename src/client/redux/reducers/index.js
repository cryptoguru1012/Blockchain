import { combineReducers }                  from 'redux';
import { reducer as reduxAsyncConnect }     from 'redux-connect';
import { showItems }                        from './items';
import registerReducer                      from './register';
import storeReducers                        from './store';

export default combineReducers({
    reduxAsyncConnect,
    items: showItems,
    register: registerReducer,
    categories: storeReducers.categoryReducer,
    newItem: storeReducers.newItemReducer
});
