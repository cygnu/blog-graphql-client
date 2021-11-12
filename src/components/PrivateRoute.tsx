import React, { useEffect } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useAuth } from "../pages/Authentication";

export const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const { currentUser } = useAuth();

  useEffect(() => {
    (currentUser === null || undefined) && (window.location.href = "/auth");
  }, [currentUser]);

  if (currentUser === null || undefined) {
    return <Redirect to="/auth" />;
  } else {
    return <Route {...props} />;
  }
};
