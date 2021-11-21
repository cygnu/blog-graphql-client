import { ApolloError } from "@apollo/client";

export interface IViewer {
  loadingViewer: boolean;
  errorViewer: ApolloError | undefined;
  dataViewer: any | undefined;
}
