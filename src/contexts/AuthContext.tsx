import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { IFormInputs, User, IContext } from "../types/Auth";
import { GET_TOKEN } from "../graphql/mutations";

const AuthContext = createContext<IContext>({} as IContext);

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC = (props: any) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [getToken] = useMutation(GET_TOKEN);

  useEffect(() => {
    const storageItem = localStorage.getItem("token");
    if (storageItem) {
      const jwtDecodedToken = jwtDecode<User>(storageItem);
      if (jwtDecodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      } else {
        setUser(jwtDecodedToken);
      }
    }
  }, []);

  const signIn = async (data: IFormInputs) => {
    const res = await getToken({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
    localStorage.setItem("token", res.data.tokenAuth.token);
    setUser(jwtDecode<User>(res.data.tokenAuth.token));
    res.data.tokenAuth.token && (window.location.href = "/");
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
