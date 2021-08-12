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

export const UPDATE_LINK_IN_BIO = gql`
  mutation($id: Uuid!, $githubUrl: String, $qiitaUrl: String, $twitterUrl: String, $websiteUrl: String) {
    createLinkInBio(input: {
      id: $id
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

export const CREATE_POST = gql`
  mutation($title: String!, $description: String, $thumbnail: thumbnail, $content: String!, $tags: [String], $category: String!, $is_publish: Boolean!) {
    createPost(input: {
      title: $title
      description: $description
      thumbnail: $thumbnail
      content: $content
      tags: $tags
      category: $category
      is_publish: $is_publish
    }) {
      post {
        title
        description
        thumbnail
        content
        tags {
          name
        }
        category {
          name
        }
        is_publish
      }
    }
  }
`

export const UPDATE_POST = gql`
  mutation($id: Uuid!, $title: String, $description: String, $thumbnail: thumbnail, $content: String, $tags: [Uuid], $category: String, $is_publish: Boolean!) {
    createPost(input: {
      id: $id
      title: $title
      description: $description
      thumbnail: $thumbnail
      content: $content
      tags: $tags
      category: $category
      is_publish: $is_publish
    }) {
      post {
        id
        title
        description
        thumbnail
        content
        tags {
          name
        }
        category {
          name
        }
        is_publish
      }
    }
  }
`

