import React, {
  createContext,
  useState,
} from 'react';
import {
  User,
  IContext,
} from '../types/Auth';

const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: React.FC = (props: any) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

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
