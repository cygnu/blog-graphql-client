import React from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  FormControl,
  TextField,
  Button,
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

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: IFormInputs) => {
    post()
    console.log(data)
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField
            type="input"
            name="title"
            label="Title"
            autoFocus
            variant="outlined"
            inputRef={register}
          />
        </FormControl>
        <FormControl>
          <TextField
            type="input"
            name="description"
            label="Description"
            variant="outlined"
            inputRef={register}
          />
        </FormControl>
        <FormControl>
          <input
            type="file"
            ref={register}
          />
        </FormControl>
        <FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};
