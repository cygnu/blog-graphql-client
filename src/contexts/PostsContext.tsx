import React, {
  createContext,
} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { IPosts } from '../types/Post';
import { GET_POSTS } from '../graphql/queries';

const PostsContext = createContext<IPosts>({} as IPosts);

const PostsProvider: React.FC = (props: any) => {
  const {
    loading: loadingPosts,
    error: errorPosts,
    data: dataPosts,
  } = useQuery(GET_POSTS)

  return (
    <PostsContext.Provider
      value={{
        loadingPosts,
        errorPosts,
        dataPosts,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  )
};

export { PostsContext, PostsProvider };
