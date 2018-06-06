import React from 'react';
import { Router, Route, Switch } from 'react-router';
import history from '../helpers/history';
import Header from './Header';
import Home from './Home';
import Register from './authentication/Register';
import Login from './authentication/Login';
import ForgotPassword from './authentication/ForgotPassword';
import ResetPassword from './authentication/ResetPassword';
import Verify from './authentication/VerifyEmail';
import Verified from './authentication/VerifiedEmail';
import Centers from './center/Center';
import CenterEvent from './event/CenterEvent';
import Events from './event/Event';
import NotFound from './NotFound';
import CenterDetails from './center/CenterDetails';
import UserRoute from '../helpers/user-route';
import '../style.scss';

const App = () => (
  <Router history={history}>
    <div>
      <Header />
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
