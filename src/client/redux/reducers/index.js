import { combineReducers }                  from 'redux';
import { reducer as reduxAsyncConnect }     from 'redux-connect';
import { showItems }                        from './items';
import registerReducer                      from './register';
import storeReducers                        from './store';
import videoReducers						from './video';
import browserReducers						from './browser';

export default combineReducers({
    reduxAsyncConnect,
    items: showItems,
    register: registerReducer,
    categories: storeReducers.categoryReducer,
    newItem: storeReducers.newItemReducer,
    video: videoReducers,
    browser: browserReducers
});
