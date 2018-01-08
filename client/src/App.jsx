import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import Home from './app/components/Landing/Home/Home';
import SignIn from './app/components/Landing/SignIn/SignIn';
import SignUp from './app/components/Landing/SignUp/SignUp';
import ForgotPassword from './app/components/Landing/ForgotPassword/ForgotPassword';
import VerifyEmail from './app/components/Landing/VerifyEmail/VerifyEmail';
import VerifiedEmail from './app/components/Landing/VerifyEmail/Verified';
import PrivateRoute from './helpers/PrivateRoute';
import AuthChecker from './helpers/authChecker';
import history from '../src/helpers/history';
import configureStore from './store/configureStore';
import Landing from './app/components/Landing/Landing';
import './App.css';

const store = configureStore;

/**
 *
 */
class App extends Component {
  /**
 *@returns {routes}
 get all sub routes for this view
 */
  getChildRoutes() {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/SignIn" component={SignIn} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/ForgotPassword" component={ForgotPassword} />
            <Route exact path="/Users/Verify" component={VerifyEmail} />
            <PrivateRoute exact authenticated={AuthChecker.checkUserAuth()} path="/Users/Verified" component={VerifiedEmail} />
          </Switch>
        </Router>
      </Provider>,
      document.getElementById('landing')
    );
  }

  /**
   *@returns {*} view for langding page
   */
  render() {
    return (
      <div>
        <Landing />
      </div>
    );
  }
}

export default App;
