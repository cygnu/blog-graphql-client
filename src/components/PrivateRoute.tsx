import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useViewer } from "../contexts/ViewerContext";

export const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const { currentUser } = useViewer();

  if (currentUser === null || undefined) {
    return <Redirect to="/auth" />;
  } else {
    return <Route {...props} />;
  }
};
