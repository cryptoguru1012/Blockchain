import React                        from 'react';
import {
  IndexRoute,
  Router,
  Route,
  browserHistory
}                                   from 'react-router';
import { ReduxAsyncConnect }        from 'redux-connect';
import App                          from './components/App';
import Register                     from './components/Register';
import Frontpage                    from './components/Frontpage';
import Store                        from './components/Store';

const Routes = (
  <Router render={(props) => <ReduxAsyncConnect {...props}/>} history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Frontpage} />
      <Route path='/register' component={Register} />
      <Route path='/store/newItem' component={Store.NewItem} />
    </Route>
  </Router>
);

export default Routes;
