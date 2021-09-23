import React from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container } from '@material-ui/core';
import {
  CREATE_PROFILE,
  CREATE_LINK_IN_BIO,
} from '../graphql/mutations';

const schema = Yup.object().shape({
  username: Yup.string()
    .max(150, 'Username must have within 150 characters')
    .required(),
  first_name: Yup.string()
    .max(150, 'First name must have within 150 characters'),
  last_name: Yup.string()
    .max(150, 'Last name must have within 150 characters'),
  avatar: Yup.mixed()
    .test('fileSize', 'The file is too large', (value) => {
      return value && value[0].size < 2000000
    }),
  background_image: Yup.mixed()
    .test('fileSize', 'The file is too large', (value) => {
      return value && value[0].size < 2000000
    }),
  local: Yup.string()
    .max(50, 'Local must have within 50 characters'),
  bio: Yup.string()
    .max(255, 'Bio must have within 255 characters'),
  github_url: Yup.string()
    .url()
    .required(),
  qiita_url: Yup.string().url(),
  twitter_url: Yup.string().url(),
  website_url: Yup.string().url(),
});

export const MergeProfile: React.FC = () => {
  const [createProfile] = useMutation(CREATE_PROFILE);
  const [createLinkInBio] = useMutation(CREATE_LINK_IN_BIO);

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <Container>
      <form onSubmit={handleSubmit(createProfile)}></form>
    </Container>
  );
};
