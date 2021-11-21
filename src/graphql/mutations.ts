import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($email: String!, $password: String!) {
    createUser(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`;

export const GET_TOKEN = gql`
  mutation ($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_PROFILE = gql`
  mutation (
    $username: String!
    $firstName: String
    $lastName: String
    $avatar: String
    $backgroundImage: String
    $local: String
    $bio: String
  ) {
    createProfile(
      input: {
        userProfInput: {
          username: $username
        }
        firstName: $firstName
        lastName: $lastName
        avatar: $avatar
        backgroundImage: $backgroundImage
        local: $local
        bio: $bio
      }
    ) {
      profile {
        user {
          id
          username
          firstName
          lastName
        }
        avatar
        backgroundImage
        local
        bio
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation (
    $id: Uuid!
    $username: String!
    $firstName: String
    $lastName: String
    $avatar: String
    $backgroundImage: String
    $local: String
    $bio: String
  ) {
    createProfile(
      input: {
        id: $id
        userProfInput: {
          username: $username
        }
        firstName: $firstName
        lastName: $lastName
        avatar: $avatar
        backgroundImage: $backgroundImage
        local: $local
        bio: $bio
      }
    ) {
      profile {
        user {
          id
          username
          firstName
          lastName
        }
        avatar
        backgroundImage
        local
        bio
      }
    }
  }
`;

export const CREATE_LINK_IN_BIO = gql`
  mutation (
    $githubUrl: String!
    $qiitaUrl: String
    $twitterUrl: String
    $websiteUrl: String
  ) {
    createLinkInBio(
      input: {
        githubUrl: $githubUrl
        qiitaUrl: $qiitaUrl
        twitterUrl: $twitterUrl
        websiteUrl: $websiteUrl
      }
    ) {
      linkInBio {
        id
        githubUrl
        qiitaUrl
        twitterUrl
        websiteUrl
      }
    }
  }
`;

export const UPDATE_LINK_IN_BIO = gql`
  mutation (
    $id: Uuid!
    $githubUrl: String
    $qiitaUrl: String
    $twitterUrl: String
    $websiteUrl: String
  ) {
    createLinkInBio(
      input: {
        id: $id
        githubUrl: $githubUrl
        qiitaUrl: $qiitaUrl
        twitterUrl: $twitterUrl
        websiteUrl: $websiteUrl
      }
    ) {
      linkInBio {
        githubUrl
        qiitaUrl
        twitterUrl
        websiteUrl
      }
    }
  }
`;

export const ADD_TAG = gql`
  mutation ($name: String!) {
    addTag(input: { name: $name }) {
      tag {
        id
        name
      }
    }
  }
`;

export const REMOVE_TAG = gql`
  mutation ($id: Uuid!) {
    removeTag(input: { id: $id }) {
      tag {
        id
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation ($name: String!) {
    addCategory(input: { name: $name }) {
      category {
        id
        name
      }
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation ($id: Uuid!) {
    removeCategory(input: { id: $id }) {
      category {
        id
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation (
    $title: String!
    $description: String
    $thumbnail: thumbnail
    $content: String!
    $tags: [String]
    $category: String!
    $isPublish: Boolean!
  ) {
    createPost(
      input: {
        title: $title
        description: $description
        thumbnail: $thumbnail
        content: $content
        tags: $tags
        category: $category
        isPublish: $isPublish
      }
    ) {
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
        isPublish
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation (
    $id: Uuid!
    $title: String
    $description: String
    $thumbnail: thumbnail
    $content: String
    $tags: [Uuid]
    $category: String
    $isPublish: Boolean!
  ) {
    createPost(
      input: {
        id: $id
        title: $title
        description: $description
        thumbnail: $thumbnail
        content: $content
        tags: $tags
        category: $category
        isPublish: $isPublish
      }
    ) {
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
        isPublish
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation ($id: Uuid!) {
    deletePost(input: { id: $id })
  } {
    post {
      id
    }
  }
`;
