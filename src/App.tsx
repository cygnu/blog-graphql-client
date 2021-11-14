import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ViewerProvider } from "./contexts/ViewerContext";
import { PostsProvider } from "./contexts/PostsContext";
import { PostProvider } from "./contexts/PostContext";
import { Authentication } from "./pages/Authentication";
import { MergePost } from "./pages/MergePost";
import { PostDetails } from "./components/PostDetails";
import { TopPage } from "./pages/TopPage";
import { PrivateRoute } from "./components/PrivateRoute";

const httpLink = new HttpLink({
  uri: "http://127.0.0.1:8000/graphql/",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError)
    console.log(`[Network error]: ${networkError}`);
});

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
const client = new ApolloClient({
  // The `from` function combines an array of individual links
  // into a link chain
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <AuthProvider>
            <ViewerProvider>
              <PostsProvider>
                <PostProvider>
                  <Route exact path="/" component={TopPage} />
                  <Route exact path="/auth" component={Authentication} />
                  <PrivateRoute exact path="/posts/new" component={MergePost} />
                  <Route path="/posts/:id" component={PostDetails} />
                </PostProvider>
              </PostsProvider>
            </ViewerProvider>
          </AuthProvider>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};
