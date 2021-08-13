import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
// import { css } from '@emotion/react';
//
// const cTTypo = css`
//   flex: 1;
//   align-items: center;
// `

export const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
        >
          Title
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
