import React from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import AuthChecker from './auth-checker';


const UserRoute = ({
  component: Component,
  redirectPath,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      const component = <Component {...props} />;
      const redirect = <Redirect to={redirectPath} />;
      if (AuthChecker.checkUserAuth() === true) {
        return component;
      }
      return redirect;
    }}
  />
);


UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirectPath: PropTypes.string.isRequired
};
export default UserRoute;
