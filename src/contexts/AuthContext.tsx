import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { User, IAuthContext } from "../types/Auth";

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC = (props: any) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    if (accessToken) {
      const jwtDecodedToken = jwtDecode<User>(accessToken);
      jwtDecodedToken.exp * 1000 < Date.now()
        ? localStorage.removeItem("token")
        : setCurrentUser(jwtDecodedToken);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        accessToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
