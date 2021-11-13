import React, { createContext, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_VIEWER } from "../graphql/queries";
import { IViewer } from "../types/Viewer";
import { useAuth } from "./AuthContext";

const ViewerContext = createContext<IViewer>({} as IViewer);

const useViewer = () => useContext(ViewerContext);

const ViewerProvider: React.FC = (props: any) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id;
  const {
    loading: loadingViewer,
    error: errorViewer,
    data: dataViewer,
  } = useQuery(GET_VIEWER, {
    variables: {
      userId,
    },
  });

  return (
    <ViewerContext.Provider
      value={{
        loadingViewer,
        errorViewer,
        dataViewer,
      }}
    >
      {props.children}
    </ViewerContext.Provider>
  );
};

export { useViewer, ViewerProvider };
