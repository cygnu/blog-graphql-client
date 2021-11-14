import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { PostsContext } from "../contexts/PostsContext";

export const Sidebar: React.FC = () => {
  const { accessToken } = useAuth();
  const { dataPosts } = useContext(PostsContext);

  return (
    <Grid item xs={12} md={4}>
      <Link to={
        accessToken ? "/posts/new" : "/auth"
      }>Create Post</Link>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Archives
      </Typography>
      {dataPosts == null ? (
        <span>No posts yet.</span>
      ) : (
        dataPosts.allPosts &&
        dataPosts.allPosts.edges.slice(-6).map((post: any) => (
          <Link key={post.node.id} to={`post/${post.node.id}`}>
            <span>{post.node.title}</span>
          </Link>
        ))
      )}
    </Grid>
  );
};
