import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid
} from '@material-ui/core';

export const Sidebar: React.FC = () => {
  return (
    <Grid item xs={12} md={4}>
      <Link to="/post">Create Post</Link>
    </Grid>
  );
};
