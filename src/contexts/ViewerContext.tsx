import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_VIEWER } from "../graphql/queries";
import jwtDecode from "jwt-decode";
import { IViewer } from "../types/Viewer";
import { User } from "../types/Auth";

const ViewerContext = createContext<IViewer>({} as IViewer);

const useViewer = () => useContext(ViewerContext);

const ViewerProvider: React.FC = (props: any) => {
  const accessToken = localStorage.getItem("token");
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);
  const userId = currentUser?.id;
  const {
    loading: loadingViewer,
    error: errorViewer,
    data: dataViewer,
  } = useQuery(
    GET_VIEWER,
    {
      variables: {
        userId
      }
    }
  );

  useEffect(() => {
    if (accessToken) {
      const jwtDecodedToken = jwtDecode<User>(accessToken);
      (jwtDecodedToken.exp * 1000 < Date.now())
        ? localStorage.removeItem("token")
        : setCurrentUser(jwtDecodedToken);
    }
  }, [accessToken]);

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
