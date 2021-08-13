import React, { useContext } from 'react';
import { PostsContext } from '../contexts/PostsContext';


export const PostsList: React.FC = () => {
  const { dataPosts } = useContext(PostsContext)

  return (
    <ul>
      {dataPosts &&
      dataPosts.allPosts &&
      dataPosts.allPosts.edges.map((post: any) => (
        <li key={post.node.id}>
          <img src={post.node.thumbnail} alt={post.node.thumbnail}/>
          <h1>{post.node.title}</h1>
          <span>{post.node.updatedAt}</span>
        </li>
      ))
      }
    </ul>
  );
};
