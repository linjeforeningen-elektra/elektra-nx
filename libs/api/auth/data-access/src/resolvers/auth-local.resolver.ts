import { GQLAuth, GraphqlGuard } from '@elektra-nx/api/apollo/utils';
import { AuthLocalSchema } from '@elektra-nx/api/auth/schema';
import { AuthUser, GQLAccessToken } from '@elektra-nx/api/auth/utils';
import { LoginWithAuthLocalDto } from '@elektra-nx/api/shared/dto';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthLocalAclAdapter } from '../adapters';

@Resolver(AuthLocalSchema)
@UseGuards(GraphqlGuard)
export class AuthLocalResolver {
  constructor(private authLocal: AuthLocalAclAdapter) {}

  @Mutation(() => GQLAccessToken)
  public async loginWithAuthLocal(@GQLAuth() auth: AuthUser, @Args('body') body: LoginWithAuthLocalDto) {
    return this.authLocal.loginWithAuthLocal(auth, body);
  }
}
