import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useViewer } from "../contexts/ViewerContext";

export const Header: React.FC = () => {
  const { currentUser, accessToken } = useAuth();
  const { dataViewer } = useViewer();

  useEffect(() => {
    console.log("===== currentUser =====", currentUser);
    console.log("===== accessToken =====", accessToken);
  }, [currentUser, accessToken]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Title</Typography>
        {accessToken ? (
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
