import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import App from './components/App';
import Register from './components/Register';
import Frontpage from './components/Frontpage';
import Store from './components/Store';
import Browser from './components/Browser';
import Offer from './components/Offer';
import Sorter from './components/Browser/Sorter';

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

const Routes = (
  <Router render={props => <ReduxAsyncConnect {...props} />} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Browser} />
      <Route path="/sort" component={Sorter} />
      <Route path="/register" component={Register} />
      <Route path="/store/newItem" component={Store.NewItemSelector} />
      <Route path="/offer" component={Offer}>
        <Route path=":id" component={Offer} />
      </Route>
    </Route>
  </Router>
);

export default Routes;
