import React from "react";
import { Grid } from "@mui/material";
import { PostsList } from "./PostsList";

export const Main: React.FC = () => {
  return (
    <Grid item xs={12} md={8}>
      <PostsList />
    </Grid>
  );
};
