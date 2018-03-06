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
import CreateCenterForm from './center/create-center-form';
import UpdateCenterForm from './center/update-center-form';
import PendingEvent from './event/pending-events';
import UpcomingEvent from './event/upcoming-events';
import Events from './event/events';
import NotFound from './notFound';
import AuthChecker from '../helpers/auth-checker';
import UserRoute from '../helpers/user-route';
import AdminRoute from '../helpers/admin-route';

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
        <Route exact path="/center-search" component={CenterSearch} />
        <Route exact path="/center-result" component={CenterResult} />
        <AdminRoute exact path="/centers" component={Centers} redirectPath="/login" />
        <UserRoute exact path="/events" component={Events} redirectPath="/login" />
        <AdminRoute exact path="/create-center" component={CreateCenterForm} redirectPath="/login" />
        <AdminRoute exact path="/update-center" component={UpdateCenterForm} redirectPath="/login" />
        <UserRoute exact path="/create-event" component={CreateEventForm} redirectPath="/login" />
        <UserRoute exact path="/update-event" component={UpdateEventForm} redirectPath="/login" />
        <AdminRoute exact path="/pending-events/:centerId" component={PendingEvent} redirectPath="/login" />
        <Route exact path="/upcoming-events/:centerId" component={UpcomingEvent} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
