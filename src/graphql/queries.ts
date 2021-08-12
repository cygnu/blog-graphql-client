import { gql } from '@apollo/client';

export const GET_VIEWER = gql`
  query {
    viewer {
      user {
        username
      }
    }
  }
`

export const GET_POST = gql`
  query {
    post {
      edges {
        node {
          title
          author
          thumbnail
          content
          tags
          category
          updatedAt
        }
      }
    }
  }
`

export const GET_POSTS = gql`
  query {
    allPosts {
      edges {
        node {
          title
          author {
            username
          }
          thumbnail
          tags {
            name
          }
          updatedAt
        }
      }
    }
  }
`
