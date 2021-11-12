import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useViewer } from "../contexts/ViewerContext";
import { useAuth } from "../pages/Authentication";

export const Header: React.FC = () => {
  const { dataViewer } = useViewer();
  const { currentUser } = useAuth();

  useEffect(() => {
    (currentUser === null || undefined) && (window.location.href = "/auth");
  }, [currentUser]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Title</Typography>
        {currentUser !== null || undefined ? (
          <Typography>{dataViewer?.viewer?.user.email}</Typography>
        ) : (
          <Button variant="outlined" size="small" component={Link} to="/auth" color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
