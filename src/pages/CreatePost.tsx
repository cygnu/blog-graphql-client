import React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../graphql/mutations';

export const CreatePost: React.FC = () => {
  const [createPost] = useMutation(CREATE_POST)

  const post = async () => {
    try {
      await createPost()
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <Container>
      <h1>Create Post</h1>
    </Container>
  );
};
