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
import Verify from './authentication/verify';
import Verified from './authentication/verified';
import Centers from './center/centers';
import CenterSearch from './center/center-search';
import CenterResult from './center/search-result';
import CreateEventForm from './event/create-event-form';
import UpdateEventForm from './event/update-event-form';
import Events from './event/events';
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
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/verified" component={Verified} />
        <Route exact path="/centers" component={Centers} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/center-search" component={CenterSearch} />
        <Route exact path="/center-result" component={CenterResult} />
        <Route exact path="/create-center" component={CreateEventForm} />
        <Route exact path="/update-center" component={UpdateEventForm} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
