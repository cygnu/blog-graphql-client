export interface IFormInputs {
  id: string,
  title: string,
  author: string,
  description: string,
  thumbnail: string,
  content: string,
  tags: string[],
  category: string,
  isPublish: boolean,
}

export interface IPost {
  getPost: any;
  dataPost: any | undefined;
  errorPost: any | undefined;
}

export interface IPosts {
  loadingPosts: boolean;
  errorPosts: any | undefined;
  dataPosts: any | undefined;
}