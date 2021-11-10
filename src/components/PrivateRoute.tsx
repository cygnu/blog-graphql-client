import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useAuth } from "../pages/Authentication";

export const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const { currentUser } = useAuth();

  if (currentUser === null || currentUser === undefined) {
    return <Redirect to="/auth" />;
  } else {
    return <Route {...props} />;
  }
};
