import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PostsContext } from "../contexts/PostsContext";
import { PostContext } from "../contexts/PostContext";

export const PostsList: React.FC = () => {
  const { dataPosts } = useContext(PostsContext);
  const { getPost } = useContext(PostContext);

  return (
    <ul>
      {dataPosts == null ? (
        <h1>No posts yet.</h1>
      ) : (
        dataPosts.allPosts &&
        dataPosts.allPosts.edges.map((post: any) => (
          <li key={post.node.id}>
            <img src={post.node.thumbnail} alt={post.node.thumbnail} />
            {getPost.id === post.node.id ? (
              <Link
                to={`/posts/${post.node.id}`}
                onClick={async () => {
                  await getPost({
                    variables: {
                      id: post.node.id,
                    },
                  });
                }}
              >
                <h1>{post.node.title}</h1>
              </Link>
            ) : (
              <React.Fragment />
            )}
            <span>{post.node.updatedAt}</span>
          </li>
        ))
      )}
    </ul>
  );
};
