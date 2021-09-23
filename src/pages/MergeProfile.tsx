import React from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  FormControl,
} from '@material-ui/core';
import { ComInputForm } from '../atoms/ComInputForm';
import { ComSubmitButton } from '../atoms/ComSubmitButton';
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
      <form onSubmit={handleSubmit(createProfile)}>
        <ComInputForm
          autoFocus
          required
          type="input"
          name="username"
          label="User Name"
          register={register}
          error={errors.username}
        />
        <ComInputForm
          type="input"
          name="firstName"
          label="First Name"
          register={register}
          error={errors.firstName}
        />
        <ComInputForm
          type="input"
          name="lastName"
          label="Last Name"
          register={register}
          error={errors.LastName}
        />
        <FormControl>
          <input
            type="file"
            name="avatar"
            ref={register}
          />
        </FormControl>
        <FormControl>
          <input
            type="file"
            name="backgroundImage"
            ref={register}
          />
        </FormControl>
        <ComInputForm
          type="input"
          name="local"
          label="Local"
          register={register}
          error={errors.local}
        />
        <ComInputForm
          type="input"
          name="githubUrl"
          label="Github Url"
          register={register}
          error={errors.githubUrl}
        />
        <ComInputForm
          type="input"
          name="qiitaUrl"
          label="Qiita Url"
          register={register}
          error={errors.qiitaUrl}
        />
        <ComInputForm
          type="input"
          name="twitterUrl"
          label="Twitter Url"
          register={register}
          error={errors.twitterUrl}
        />
        <ComInputForm
          type="input"
          name="websiteUrl"
          label="Website Url"
          register={register}
          error={errors.websiteUrl}
        />
        <ComSubmitButton
          label="Submit"
        />
      </form>
    </Container>
  );
};
