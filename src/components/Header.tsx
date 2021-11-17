import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext"
import { useViewer } from "../contexts/ViewerContext";
import { css } from "@emotion/react";

const cTTypo = css`
  flex: 1;
  align-items: center;
`

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
        <Typography
          variant="h6"
          noWrap
          css={cTTypo}
        >
          Title
        </Typography>
        {accessToken ? (
          <Typography>{dataViewer?.viewer?.email}</Typography>
        ) : (
          <Button
            variant="outlined"
            size="small"
            component={Link}
            to="/auth"
            color="inherit"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
