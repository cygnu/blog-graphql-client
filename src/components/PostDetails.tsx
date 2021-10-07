import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type PostDetailsProps = RouteComponentProps<{
  id: string;
}>;

export const PostDetails: React.FC<PostDetailsProps> = (props) => {
  const id = props.match.params.id;

  return (
    <h1>PostDetails ID: {id}</h1>
  );
};
