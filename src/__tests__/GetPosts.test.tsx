import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_POSTS } from "../graphql/queries";
import { PostsList } from "../components/PostsList";

const mocks = [
  {
    request: {
      query: GET_POSTS,
    },
    result: {
      data: {
        allPosts: {
          edges: {
            node: [
              {
                id: "0001",
                title: "初めてのブログ",
                author: {
                  username: "cygnu",
                },
                thumbnail: null,
                tags: [
                  {
                    name: "me",
                  },
                ],
              },
              {
                id: "0002",
                title: "React Testを初めて書いてみた。",
                author: {
                  username: "cygnu",
                },
                thumbnail: null,
                tags: [
                  {
                    name: "react",
                  },
                  {
                    name: "tech",
                  },
                ],
              },
            ],
          },
        },
      },
    },
  },
];

test("render get_posts data", () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <PostsList />
    </MockedProvider>
  );
});
