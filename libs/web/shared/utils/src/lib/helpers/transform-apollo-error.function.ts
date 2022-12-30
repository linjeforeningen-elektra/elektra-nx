import { ApolloError } from '@apollo/client/errors';
import { ElektraErrors } from '@elektra-nx/shared/util/types';

export interface IHttpException {
  statusCode: number;
  message: string | ElektraErrors;
  error: string;
}

export function transformApolloError(error: ApolloError): IHttpException {
  return error.graphQLErrors[0].extensions['response'] as IHttpException;
}
