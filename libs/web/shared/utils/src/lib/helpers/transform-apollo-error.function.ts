import { ApolloError } from '@apollo/client/errors';

export function transformApolloError(error: ApolloError): Record<string, unknown> {
  return error.graphQLErrors[0].extensions['response'] as Record<string, unknown>;
}
