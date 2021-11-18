import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { hopscotch } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Container } from "@mui/material";
import { PostContext } from "../contexts/PostContext";

type MarkdownViewerProps = {
  markdown: any;
};

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdown }) => {
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
    />
  );
};

type PostDetailsProps = RouteComponentProps<{
  id: string;
}>;

export const PostDetails: React.FC<PostDetailsProps> = (props) => {
  const { dataPost, errorPost } = useContext(PostContext);

  return (
    <Container>
      {errorPost && <h1>{errorPost.message}</h1>}
      {dataPost &&
      dataPost.post &&
      dataPost.post.id === props.match.params.id ? (
        <React.Fragment>
          <h1>{dataPost.post.title}</h1>
          <p>{dataPost.post.author}</p>
          <p>{dataPost.post.updatedAt}</p>
          <MarkdownViewer markdown={dataPost.post.content} />
        </React.Fragment>
      ) : (
        <React.Fragment />
      )}
    </Container>
  );
};
