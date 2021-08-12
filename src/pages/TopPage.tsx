import React from 'react';
import {
  Grid
} from '@material-ui/core';

export const TopPage: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Grid container>
        <Main />
        <Sidebar />
      </Grid>
      <Footer />
    </React.Fragment>
  );
};
