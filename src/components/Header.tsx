import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useViewer } from "../contexts/ViewerContext";
import { useAuth } from "../pages/Authentication";

export const Header: React.FC = () => {
  const { dataViewer } = useViewer();
  const { currentUser } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Title</Typography>
        {currentUser?.token ? (
          <p>{dataViewer.viewer.user.email}</p>
        ) : (
          <Button variant="outlined" size="small" component={Link} to="/auth" color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
