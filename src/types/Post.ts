export interface IFormInputs {
  title: string,
  description: string,
  thumbnail: string,
  content: string,
  tags: string[],
  category: string,
  is_publish: boolean,
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