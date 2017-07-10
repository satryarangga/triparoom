import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Routes from './routes';
import promise from 'redux-promise';

import fetchToken from './actions/actionToken';
import reducers from './reducers/';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

fetchToken(() => {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Routes />
    </Provider>
    , document.querySelector('.fullContainer'));
});

// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <Routes />
//   </Provider>
//   , document.querySelector('.fullContainer'));
