import React from "react";

export interface IFormInputs {
  email: string;
  password: string;
}

export interface User extends IFormInputs {
  id: string;
  token: string | null;
  exp: number;
}

export interface IAuthPageProps {
  label: string;
}

export interface IAuthPageContext {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (data: IFormInputs, e: any) => Promise<void>;
}

export interface IAuthContext {
  currentUser: User | null | undefined;
  accessToken: string | null;
  signUp: (data: IFormInputs) => Promise<void>;
  signIn: (data: IFormInputs) => Promise<void>;
  signOut: () => Promise<void>;
}
