import React, { createContext, useContext } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { useAuth } from "../pages/Authentication";
import { GET_VIEWER } from "../graphql/queries";

interface IViewer {
  getViewer: any;
  dataViewer: any | undefined;
  errorViewer: any | undefined;
}

const ViewerContext = createContext<IViewer>({} as IViewer);

const useViewer = () => useContext(ViewerContext);

const ViewerProvider: React.FC = (props: any) => {
  const { currentUser } = useAuth();
  const [getViewer, { data: dataViewer, error: errorViewer }] = useLazyQuery(
    GET_VIEWER,
    {
      variables: {
        id: currentUser?.id,
      },
    }
  );

  return (
    <ViewerContext.Provider
      value={{
        getViewer,
        dataViewer,
        errorViewer,
      }}
    >
      {props.children}
    </ViewerContext.Provider>
  );
};

export { useViewer, ViewerProvider };
