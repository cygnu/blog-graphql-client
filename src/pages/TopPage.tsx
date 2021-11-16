import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Sidebar } from "../components/Sidebar";
import { Loading } from "../components/Loading";
import { useViewer } from "../contexts/ViewerContext";
import { PostsContext } from "../contexts/PostsContext";

export const TopPage: React.FC = () => {
  const { loadingViewer } = useViewer();
  const { loadingPosts } = useContext(PostsContext);

  if (loadingViewer || loadingPosts) return <Loading />;

  return (
    <React.Fragment>
      <Header />
      <Grid container>
        <Main />
        <Sidebar />
      </Grid>
      <Footer />
    </React.Fragment>
  );
};
