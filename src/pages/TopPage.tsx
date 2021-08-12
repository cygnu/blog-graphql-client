import React from 'react';
import {
  Grid
} from '@material-ui/core';
import { Header } from '../components/Header';

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
