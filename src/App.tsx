import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ViewerProvider } from "./contexts/ViewerContext";
import { PostsProvider } from "./contexts/PostsContext";
import { PostProvider } from "./contexts/PostContext";
import { Authentication } from "./pages/Authentication";
import { MergePost } from "./pages/MergePost";
import { PostDetails } from "./components/PostDetails";
import { TopPage } from "./pages/TopPage";

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:8000/graphql/",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the contexts so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <ViewerProvider>
            <PostsProvider>
              <PostProvider>
                <Route exact path="/" component={TopPage} />
                <Route exact path="/auth" component={Authentication} />
                <Route path="/posts/:id" component={PostDetails} />
                <Route exact path="/posts" component={MergePost} />
              </PostProvider>
            </PostsProvider>
          </ViewerProvider>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};
