import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { PostsContext } from "../contexts/PostsContext";
import { useViewer } from "../contexts/ViewerContext";
import { PostsList } from "./PostsList";

export const Main: React.FC = () => {
  const { loadingPosts, errorPosts } = useContext(PostsContext);
  const { loadingViewer, errorViewer } = useViewer();

  if (loadingPosts || loadingViewer) return <h1>Loading...</h1>;
  if (errorPosts || errorViewer)
    return (
      <React.Fragment>
        <h1>{errorPosts?.message}</h1>
        <h1>{errorViewer?.message}</h1>
      </React.Fragment>
    );

  return (
    <Grid item xs={12} md={8}>
      <PostsList />
    </Grid>
  );
};
