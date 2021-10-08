import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
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
          <Route exact path="/" component={TopPage} />
          <Route exact path="/auth" component={Authentication} />
          <Route exact path="/posts/create" component={MergePost} />
          <PrivateRoute path="/posts/:id/edit" component={MergePost} />
          <Route path="/posts/:id" component={PostDetails} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};
