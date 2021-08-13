import React from 'react';
import {
  Grid
} from '@material-ui/core';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Main } from '../components/Main';

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
