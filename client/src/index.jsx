import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import configureStore from './store';

// ReactDOM.render(
//   <Provider store={store}>
//     <Header />
//   </Provider>,
//   document.getElementById('header')
// );

const store = configureStore;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('body')
);
