import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }: any) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={props => (
        (currentUser != null)
          ? <Component {...props} />
          : <Redirect to="/auth" />
      )}
    />
  );
};
