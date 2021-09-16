import React, {
  createContext,
  useState,
} from 'react';

interface IFormInputs {
  email: string;
  password: string;
}

interface User extends IFormInputs {
  token: string;
  exp: number;
}

interface IContext {
  user: User | null | undefined;
}

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
