import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router';
import history from '../helpers/history';
import '../style.scss';
import Home from './home';
import Register from './authentication/register';
import Login from './authentication/login';
import ForgotPassword from './authentication/forgot-password';
import ResetPassword from './authentication/reset-password';
import NotFound from './notFound';

const App = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
