import React from 'react';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { Container } from '@material-ui/core';
import {
  CREATE_PROFILE,
  CREATE_LINK_IN_BIO,
} from '../graphql/mutations';

const schema = Yup.object().shape({
  username: Yup.string()
    .required(),
  first_name: Yup.string(),
  last_name: Yup.string(),
  avatar: Yup.string(),
  background_image: Yup.string(),
  local: Yup.string(),
  bio: Yup.string(),
  github_url: Yup.string()
    .required(),
  qiita_url: Yup.string(),
  twitter_url: Yup.string(),
  website_url: Yup.string(),
});

export const MergeProfile: React.FC = () => {
  const [createProfile] = useMutation(CREATE_PROFILE);
  const [createLinkInBio] = useMutation(CREATE_LINK_IN_BIO);

  return (
    <Container>
      <form></form>
    </Container>
  );
};
