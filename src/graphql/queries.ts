import { gql } from "@apollo/client";

export const GET_VIEWER = gql`
  query ($id: Uuid!) {
    viewer(id: $id) {
      user {
        id
        username
      }
    }
  }
`;

export const GET_TAG = gql`
  query {
    tag {
      name
    }
  }
`;

export const GET_TAGS = gql`
  query {
    allTags {
      name
    }
  }
`;

export const GET_CATEGORY = gql`
  query {
    category {
      name
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    allCategories {
      name
    }
  }
`;

export const GET_POST = gql`
  query ($id: Uuid!) {
    post(id: $id) {
      id
      title
      author {
        username
      }
      thumbnail
      content
      tags {
        id
      }
      category
      updatedAt
    }
  }
`;

export const GET_POSTS = gql`
  query {
    allPosts {
      edges {
        node {
          id
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
`;
