import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import configureStore from './store/configureStore';
import App from './App';
import Header from './app/components/Header/Header';
import Home from './app/components/Landing/Home/Home';
import SignIn from './app/components/Landing/SignIn/SignIn';
import SignUp from './app/components/Landing/SignUp/SignUp';
import ForgotPassword from './app/components//Landing/ForgotPassword/ForgotPassword';
import VerifyEmail from './app/components/Landing/VerifyEmail/VerifyEmail';
import VerifiedEmail from './app/components/Landing/VerifyEmail/Verified';
import Center from './app/components/Centers/Centers';
import CenterSearch from './app/components/Centers/CenterSearch';
import CenterResults from './app/components/Centers/SearchResults';
import Event from './app/components/Events/Events';
import history from './helpers/history';
import PrivateRoute from './helpers/PrivateRoute';
import AuthChecker from './helpers/authChecker';


const store = configureStore;

ReactDOM.render(
  <Provider store={store}>
    <Header />
  </Provider>,
  document.getElementById('header')
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/SignIn" component={SignIn} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/ForgotPassword" component={ForgotPassword} />
        <Route exact path="/users/verify" component={VerifyEmail} />
        <Route exact path="/centersearch" component={CenterSearch} />
        <Route exact path="/centers" component={CenterResults} />
        <PrivateRoute exact authenticated={AuthChecker.checkUserAuth()} path="/events" component={Event} />
        <PrivateRoute exact authenticated={AuthChecker.checkUserAuth()} path="/Users/Verified" component={VerifiedEmail} />
        <PrivateRoute exact authenticated={AuthChecker.checkAdminAuth()} path="/admin/centers" component={Center} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
