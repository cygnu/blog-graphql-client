import React, { useContext } from 'react';
import {
  Grid
} from '@material-ui/core';
import { PostsContext } from '../contexts/PostsContext';
import { PostsList } from './PostsList';

export const Main: React.FC = () => {
  const { loadingPosts, errorPosts } = useContext(PostsContext)

  if (loadingPosts) return <h1>Loading...</h1>
  if (errorPosts) return <h1>{errorPosts.message}</h1>

  return (
    <Grid item xs={12} md={8}>
      <PostsList />
    </Grid>
  );
};
