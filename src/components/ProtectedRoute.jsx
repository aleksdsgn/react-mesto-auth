import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* eslint-disable */
const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() => (props.loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />)}
    </Route>
  );
};
/* eslint-disable */

export default ProtectedRoute;
