import React, {
  createContext,
} from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { IPost } from '../types/Post';
import { GET_POST } from '../graphql/queries';

const PostContext = createContext<IPost>({} as IPost);

const PostProvider: React.FC = (props: any) => {
  const [
    getPost,
    { data: dataPost, error: errorPost }
  ] = useLazyQuery(GET_POST, { fetchPolicy: "network-only" });

  return (
    <PostContext.Provider
      value={{
        getPost,
        dataPost,
        errorPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
