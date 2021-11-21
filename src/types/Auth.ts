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

export interface IAuthPageContext {
  tabIndex: number;
}

export interface IAuthContext {
  currentUser: User | null | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  accessToken: string | null;
}
