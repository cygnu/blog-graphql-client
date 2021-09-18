import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  FormControl,
  Button,
} from '@material-ui/core';
import {
  IFormInputs
} from '../types/Post';
import { ComInputForm } from '../atoms/ComInputForm';
import { MarkdownEditor } from '../components/MarkdownEditor';
import {
  CREATE_POST,
  UPDATE_POST,
} from '../graphql/mutations';

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

export const MergePost: React.FC = () => {
  const [editedId, setEditedId] = useState<string>("");
  const [createPost] = useMutation(CREATE_POST);
  const [updatePost] = useMutation(UPDATE_POST);

  const onSubmit = async (data: IFormInputs) => {
    editedId
      ? await createPost({
          variables: {
            title: data.title,
            description: data.description,
            thumbnail: data.thumbnail,
            content: data.content,
            tags: data.tags,
            category: data.category,
            is_publish: data.is_publish,
          }
        }) && (window.location.href = "/")
      : await updatePost({
          variables: {
            id: editedId,
            title: data.title,
            description: data.description,
            thumbnail: data.thumbnail,
            content: data.content,
            tags: data.tags,
            category: data.category,
            is_publish: data.is_publish,
          }
        }) && (window.location.href = "/")
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ComInputForm
          autoFocus
          name="title"
          label="Title"
          register={register}
          error={errors.title}
        />
        <ComInputForm
          name="description"
          label="Description"
          register={register}
          error={errors.description}
        />
        <FormControl>
          <input
            type="file"
            name="thumbnail"
            ref={register}
          />
        </FormControl>
        <MarkdownEditor />
        <ComInputForm
          name="category"
          label="Category"
          register={register}
          error={errors.category}
        />
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
