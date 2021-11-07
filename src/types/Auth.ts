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
  currentUser: User | null | undefined;
  signIn: (data: IFormInputs) => Promise<void>;
  signOut: () => Promise<void>;
}
