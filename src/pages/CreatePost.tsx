import React from 'react';
import { useMutation } from '@apollo/client';
import {
  Container
} from '@material-ui/core';
import { CREATE_POST } from '../graphql/mutations';

interface IFormInputs {
  title: string,
  description: string,
  thumbnail: string,
  content: string,
  tags: string[],
  category: string,
  is_publish: boolean,
}

export const CreatePost: React.FC = () => {
  const [createPost] = useMutation(CREATE_POST)

  const post = async () => {
    try {
      await createPost()
    } catch (err) {
      console.log(err)
    }
  }

  const onSubmit = (data: IFormInputs) => {
    post()
    console.log(data)
  }

  return (
    <Container>
      <h1>Create Post</h1>
    </Container>
  );
};
