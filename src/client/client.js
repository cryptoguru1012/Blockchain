import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { applyMiddleware, createStore, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers/index';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(reduxThunk)));

const component = (
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
);

ReactDOM.render(component, document.getElementById('react-view'));
