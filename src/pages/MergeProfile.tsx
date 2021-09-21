import React from 'react';
import * as Yup from 'yup';
import { Container } from '@material-ui/core';

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
  return (
    <Container>
      <form></form>
    </Container>
  );
};
