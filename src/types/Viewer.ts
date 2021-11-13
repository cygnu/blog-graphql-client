import { User } from "./Auth";

export interface IViewer {
  loadingViewer: boolean;
  errorViewer: any | undefined;
  dataViewer: any | undefined;
  currentUser: User | null | undefined;
  accessToken: string | null;
}
