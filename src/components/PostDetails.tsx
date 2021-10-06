import React from 'react';
import { useParams } from 'react-router-dom';

export const PostDetails: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();

  return (
    <h1>PostDetails ID: {id}</h1>
  );
};