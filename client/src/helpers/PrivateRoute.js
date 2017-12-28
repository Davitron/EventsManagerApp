import React from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const component = <Component {...props} />;
        const redirect = <Redirect to='/SignIn' />;
        if (authenticated === true) {
          return component;
        }
        return redirect;
      }}
    />
  );
};

export default PrivateRoute;

