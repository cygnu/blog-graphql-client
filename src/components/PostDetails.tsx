import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PostContext } from '../contexts/PostContext';

type PostDetailsProps = RouteComponentProps<{
  id: string;
}>;

export const PostDetails: React.FC<PostDetailsProps> = (props) => {
  const { dataPost } = useContext(PostContext);
  dataPost.post.id = props.match.params.id;

  return (
    <h1>PostDetails ID: {dataPost.post.id}</h1>
  );
};
