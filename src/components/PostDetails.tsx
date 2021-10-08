import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container } from "@mui/material";
import { PostContext } from "../contexts/PostContext";

type PostDetailsProps = RouteComponentProps<{
  id: string;
}>;

export const PostDetails: React.FC<PostDetailsProps> = (props) => {
  const { dataPost, errorPost } = useContext(PostContext);

  return (
    <Container>
      {errorPost && <h1>{errorPost.message}</h1>}
      {dataPost &&
      dataPost.post &&
      dataPost.post.id === props.match.params.id ? (
        <h1>PostDetails ID: {dataPost.post.id}</h1>
      ) : (
        <React.Fragment />
      )}
    </Container>
  );
};
