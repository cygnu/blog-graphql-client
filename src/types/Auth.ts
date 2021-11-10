import React from "react";

export interface IFormInputs {
  email: string;
  password: string;
}

export interface User extends IFormInputs {
  id: string;
  token: string;
  exp: number;
}

export interface IAuthProps {
  label: string;
}

export interface IContext {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  currentUser: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  onSubmit: (data: IFormInputs, e: any) => Promise<void>;
}
