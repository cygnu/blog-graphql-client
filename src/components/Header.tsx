import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../pages/Authentication";

export const Header: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Title</Typography>
        {currentUser ? (
          <React.Fragment />
        ) : (
          <Button variant="outlined" size="small" component={Link} to="/auth">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
