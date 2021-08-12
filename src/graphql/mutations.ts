import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation($email: String!, $password: String!) {
    createUser(input: {
      email: $email,
      password: $password
    }) {
      user {
        id
      }
    }
  }
`

export const GET_TOKEN = gql`
  mutation($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`

export const CREATE_LINK_IN_BIO = gql`
  mutation($githubUrl: String!, $qiitaUrl: String, $twitterUrl: String, $websiteUrl: String) {
    createLinkInBio(input: {
      githubUrl: $githubUrl,
      qiitaUrl: $qiitaUrl,
      twitterUrl: $twitterUrl,
      websiteUrl: $websiteUrl
    }) {
      linkInBio {
        githubUrl
        qiitaUrl
        twitterUrl
        websiteUrl
      }
    }
  }
`
