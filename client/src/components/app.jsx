import React from 'react';
import { Router, Route, Switch } from 'react-router';
import history from '../helpers/history';
import Home from './home';
import Register from './authentication/register';
import Login from './authentication/login';
import ForgotPassword from './authentication/forgot-password';
import ResetPassword from './authentication/reset-password';
import Verify from './authentication/verify';
import Verified from './authentication/verified';
import Centers from './center/centers';
import CenterEvent from './event/events-admin';
// import UpcomingEvent from './event/upcoming-events';
import Events from './event/events';
import NotFound from './notFound';
import CenterDetails from './center/center-details';
import UserRoute from '../helpers/user-route';
// import AdminRoute from '../helpers/admin-route';
import '../style.scss';

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
        <Route exact path="/centers/:centerId" component={CenterDetails} />
        <Route exact path="/centers" component={Centers} />
        <UserRoute exact path="/events" component={Events} redirectPath="/login" />
        <UserRoute exact path="/pending-events" component={CenterEvent} redirectPath="/login" />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
