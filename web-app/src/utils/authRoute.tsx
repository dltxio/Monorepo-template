import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

const AuthRoute = ({ component, ...props }: any) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const Component = component;
  return (
    <Route
      {...props}
      render={() => {
        if (loading) {
          return <Loader />;
        } else if (!user) {
          return <Redirect to="/login" />;
        } else if (
          user &&
          !user.emailVerified &&
          location.pathname !== "/verify-email"
        ) {
          return <Redirect to="/verify-email" />;
        }
        return <Component />;
      }}
    />
  );
};

export default AuthRoute;
