import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid
} from '@mui/material';

export const Sidebar: React.FC = () => {
  return (
    <Grid item xs={12} md={4}>
      <Link to="/posts/create">Create Post</Link>
    </Grid>
  );
};
