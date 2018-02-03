import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import Header from './components/header';
import App from './components/app';
import store from './store';

// ReactDOM.render(
//   <Provider store={store}>
//     <Header />
//   </Provider>,
//   document.getElementById('header')
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('body')
);

registerServiceWorker();
