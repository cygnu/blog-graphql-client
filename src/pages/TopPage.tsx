import React from 'react';
import {
  Grid
} from '@mui/material';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Sidebar } from '../components/Sidebar';

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
