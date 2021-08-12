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