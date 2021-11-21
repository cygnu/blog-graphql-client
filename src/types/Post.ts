import { ApolloError } from "@apollo/client";

export interface IFormInputs {
  id: string;
  title: string;
  author: string;
  description: string;
  thumbnail: string;
  content: string;
  tags: string[];
  category: string;
  isPublish: boolean;
}

export interface IPost {
  getPost: any;
  dataPost: any | undefined;
  errorPost: ApolloError | undefined;
}

export interface IPosts {
  loadingPosts: boolean;
  errorPosts: ApolloError | undefined;
  dataPosts: any | undefined;
}
