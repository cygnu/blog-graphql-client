import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { hopscotch } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Container } from "@mui/material";
import { PostContext } from "../contexts/PostContext";

// @ts-ignore
const MarkdownViewer: React.FC = ({ markdown }) => {
  return (
    <ReactMarkdown
      children={markdown}
      components={{
        code({ node, className, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              style={hopscotch}
              {...props}
            />
          ) : (
            <code className={className} {...props} />
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
    />
  );
};

type PostDetailsProps = RouteComponentProps<{
  id: string;
}>;

export const PostDetails: React.FC<PostDetailsProps> = (props) => {
  const { dataPost, errorPost } = useContext(PostContext);
  const markdown = dataPost.post.content;

  return (
    <Container>
      {errorPost && <h1>{errorPost.message}</h1>}
      {dataPost &&
      dataPost.post &&
      dataPost.post.id === props.match.params.id ? (
        <React.Fragment>
          <h1>PostDetails ID: {dataPost.post.id}</h1>
          <MarkdownViewer children={markdown} />
        </React.Fragment>
      ) : (
        <React.Fragment />
      )}
    </Container>
  );
};
