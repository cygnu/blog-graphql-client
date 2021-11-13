import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { IFormInputs, User, IAuthContext } from "../types/Auth";
import { CREATE_USER, GET_TOKEN } from "../graphql/mutations";

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC = (props: any) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const accessToken = localStorage.getItem("token");
  const [getToken] = useMutation(GET_TOKEN);
  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    if (accessToken) {
      const jwtDecodedToken = jwtDecode<User>(accessToken);
      jwtDecodedToken.exp * 1000 < Date.now()
        ? localStorage.removeItem("token")
        : setCurrentUser(jwtDecodedToken);
    }
  }, [currentUser, accessToken]);

  const signUp = async (data: IFormInputs) => {
    await createUser({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
    const res = await getToken({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
    localStorage.setItem("token", res.data.tokenAuth.token);
    setCurrentUser(jwtDecode<User>(res.data.tokenAuth.token));
    res.data.tokenAuth.token && (window.location.href = "/");
  };

  const signIn = async (data: IFormInputs) => {
    const res = await getToken({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
    localStorage.setItem("token", res.data.tokenAuth.token);
    setCurrentUser(jwtDecode<User>(res.data.tokenAuth.token));
    res.data.tokenAuth.token && (window.location.href = "/");
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        accessToken,
        signUp,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
