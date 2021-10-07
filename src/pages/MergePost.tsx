import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  useForm,
  Controller
} from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  FormControl,
  Switch,
} from '@mui/material';
import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';
import {
  IFormInputs
} from '../types/Post';
import { ComInputForm } from '../atoms/ComInputForm';
import { ComInputFile } from '../atoms/ComInputFile';
import { ComSubmitButton } from '../atoms/ComSubmitButton';
import { MarkdownEditor } from '../components/MarkdownEditor';
import { useViewer } from '../contexts/ViewerContext';
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
  isPublish: Yup.boolean().default(false)
})

export const MergePost: React.FC = () => {
  const [editedId, setEditedId] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [createPost] = useMutation(CREATE_POST);
  const [updatePost] = useMutation(UPDATE_POST);
  const { dataViewer } = useViewer();

  const postCreated = async (data: IFormInputs) => {
    await createPost({
      variables: {
        title: data.title,
        author: dataViewer.viewer.user.username,
        description: data.description,
        thumbnail: data.thumbnail,
        content: data.content,
        tags: data.tags,
        category: data.category,
        isPublish: data.isPublish,
      }
    });
    window.location.href = "/"
  };

  const postUpdated = async (data: IFormInputs) => {
    await updatePost({
      variables: {
        id: editedId,
        title: data.title,
        author: dataViewer.viewer.user.username,
        description: data.description,
        thumbnail: data.thumbnail,
        content: data.content,
        tags: data.tags,
        category: data.category,
        isPublish: data.isPublish,
      }
    });
    window.location.href = "/"
  }

  const { handleSubmit, register, errors, control } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <Container>
      <form onSubmit={handleSubmit(editedId ? postUpdated : postCreated)}>
        <ComInputForm
          autoFocus
          required
          type="input"
          name="title"
          label="Title"
          register={register}
          error={errors.title}
        />
        <ComInputForm
          type="input"
          name="description"
          label="Description"
          register={register}
          error={errors.description}
        />
        <ComInputFile
          name="thumbnail"
          register={register}
          error={errors.thumbnail}
        />
        <Controller
          name="content"
          as={<MarkdownEditor />}
          control={control}
          defaultValue=""
        />
        <Controller
          name="tags"
          render={(
            { ref }
          ) => (
            <ReactTagInput
              tags={tags}
              onChange={(newTags: string[]) => setTags(newTags)}
              placeholder="Enter a tag"
              ref={ref}
            />
          )}
          control={control}
          defaultValue={tags}
        />
        <ComInputForm
          required
          type="input"
          name="category"
          label="Category"
          register={register}
          error={errors.category}
        />
        <FormControl>
          <Switch
            color="primary"
            name="isPublish"
            inputRef={register}
          />
        </FormControl>
        <ComSubmitButton
          label="Submit"
        />
      </form>
    </Container>
  );
};
