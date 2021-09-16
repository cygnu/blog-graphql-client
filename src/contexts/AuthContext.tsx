import React, {
  createContext,
  useEffect,
  useState,
} from 'react';
import jwtDecode from 'jwt-decode';
import {
  User,
  IContext,
} from '../types/Auth';

const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: React.FC = (props: any) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const storageItem = localStorage.getItem("token")
    if (storageItem) {
      const jwtDecodedToken = jwtDecode<User>(storageItem)
      if (jwtDecodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token")
      } else {
        setUser(jwtDecodedToken)
      }
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
};
