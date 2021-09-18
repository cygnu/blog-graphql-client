import React from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import { CREATE_POST } from '../graphql/mutations';
import { MarkdownEditor } from '../components/MarkdownEditor';

interface IFormInputs {
  title: string,
  description: string,
  thumbnail: string,
  content: string,
  tags: string[],
  category: string,
  is_publish: boolean,
}

const schema = Yup.object().shape({
  title: Yup.string()
    .max(150, 'Title must have within 150 characters')
    .required('Title is required'),
  description: Yup.string()
    .max(255, 'Description must have within 255 characters'),
  thumbnail: Yup.mixed()
    .test('fileSize', 'The file is too large', (value) => {
      return value && value[0].size < 2000000
    }),
  content: Yup.string().required('Content is required'),
  tags: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string(),
      })
    ),
  category: Yup.string().required('Category is required'),
  is_publish: Yup.boolean()
})

export const CreatePost: React.FC = () => {
  const [createPost] = useMutation(CREATE_POST);

  const onSubmit = async (data: IFormInputs) => {
    try {
      await createPost()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

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
          {errors.title && (
            <div>{errors.title.message}</div>
          )}
        </FormControl>
        <FormControl>
          <TextField
            type="input"
            name="description"
            label="Description"
            variant="outlined"
            inputRef={register}
          />
          {errors.description && (
            <div>{errors.description.message}</div>
          )}
        </FormControl>
        <FormControl>
          <input
            type="file"
            ref={register}
          />
        </FormControl>
        <MarkdownEditor />
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
