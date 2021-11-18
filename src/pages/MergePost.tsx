import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, FormControl, Switch } from "@mui/material";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { IFormInputs } from "../types/Post";
import { ComInputForm } from "../atoms/ComInputForm";
import { ComInputFile } from "../atoms/ComInputFile";
import { ComSubmitButton } from "../atoms/ComSubmitButton";
import { PostContext } from "../contexts/PostContext";
import { useViewer } from "../contexts/ViewerContext";
import { CREATE_POST, UPDATE_POST } from "../graphql/mutations";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import marked from "marked";
// @ts-ignore
import highlight from "highlightjs";
import "highlightjs/styles/shades-of-purple.css";
import { css } from "@emotion/react";

const containerForm = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15vh auto 0;
  width: 100%;
  @media (min-width: 480px) {
    max-width: 480px;
  }
`

const cFSwitch = css`
  align-items: start;
  width: 100%;
`

const schema = Yup.object().shape({
  title: Yup.string()
    .max(150, "Title must have within 150 characters")
    .required("Title is required"),
  description: Yup.string().max(
    255,
    "Description must have within 255 characters"
  ),
  thumbnail: Yup.mixed().test("fileSize", "The file is too large", (value) => {
    return value && value[0].size < 2000000;
  }),
  content: Yup.string().required("Content is required"),
  tags: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
    })
  ),
  category: Yup.string().required("Category is required"),
  isPublish: Yup.boolean().default(false),
});

marked.setOptions({
  highlight: function (code, lang) {
    return highlight.highlightAuto(code, [lang.split(":")[0]]).value;
  },
});

export const MergePost: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [markdown, setMarkdown] = useState<string>("");
  const [createPost] = useMutation(CREATE_POST);
  const [updatePost] = useMutation(UPDATE_POST);
  const { dataPost } = useContext(PostContext);
  const { dataViewer } = useViewer();

  const postCreated = async (data: IFormInputs) => {
    await createPost({
      variables: {
        title: data.title,
        author: dataViewer.viewer.email,
        description: data.description,
        thumbnail: data.thumbnail,
        content: data.content,
        tags: data.tags,
        category: data.category,
        isPublish: data.isPublish,
      },
    });
    window.location.href = "/";
  };

  const postUpdated = async (data: IFormInputs) => {
    await updatePost({
      variables: {
        id: dataPost?.post?.id,
        title: data.title,
        author: dataViewer.viewer.email,
        description: data.description,
        thumbnail: data.thumbnail,
        content: data.content,
        tags: data.tags,
        category: data.category,
        isPublish: data.isPublish,
      },
    });
    window.location.href = "/";
  };

  const { handleSubmit, register, errors, control } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <form
        onSubmit={handleSubmit(dataPost?.post?.id ? postUpdated : postCreated)}
        css={containerForm}
      >
        <ComInputForm
          autoFocus
          required
          type="input"
          name="title"
          label="Title"
          register={register}
          error={errors.title}
        />
        <ComInputForm
          type="input"
          name="description"
          label="Description"
          register={register}
          error={errors.description}
        />
        <ComInputFile
          name="thumbnail"
          register={register}
          error={errors.thumbnail}
        />
        <Controller
          name="content"
          render={({ ref }) => (
            <React.Fragment>
              <SimpleMDE
                onChange={(e) => setMarkdown(e)}
                ref={ref}
              />
              <div>
                <span dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
              </div>
            </React.Fragment>
          )}
          control={control}
          defaultValue=""
        />
        <Controller
          name="tags"
          render={({ ref }) => (
            <ReactTagInput
              tags={tags}
              onChange={(newTags: string[]) => setTags(newTags)}
              placeholder="Enter a tag"
              ref={ref}
            />
          )}
          control={control}
          defaultValue={tags}
        />
        <ComInputForm
          required
          type="input"
          name="category"
          label="Category"
          register={register}
          error={errors.category}
        />
        <FormControl css={cFSwitch}>
          <Switch
            color="primary"
            name="isPublish"
            inputRef={register}
          />
        </FormControl>
        <ComSubmitButton label="Submit" />
      </form>
    </Container>
  );
};
