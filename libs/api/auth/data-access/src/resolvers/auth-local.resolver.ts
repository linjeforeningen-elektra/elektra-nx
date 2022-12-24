import { GQLAuth, GraphqlGuard } from '@elektra-nx/api/apollo/utils';
import { AuthLocalSchema } from '@elektra-nx/api/auth/schema';
import { AuthUser, GQLAccessToken } from '@elektra-nx/api/auth/utils';
import { ConfirmEmailDto, LoginWithAuthLocalDto, RegisterWithAuthLocalDto } from '@elektra-nx/api/shared/dto';
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

  @Mutation(() => GQLAccessToken)
  public async registerWithAuthLocal(@GQLAuth() auth: AuthUser, @Args('body') body: RegisterWithAuthLocalDto) {
    return this.authLocal.registerWithAuthLocal(auth, body);
  }

  @Mutation(() => GQLAccessToken)
  public async confirmEmailAddress(@GQLAuth() auth: AuthUser, @Args('body') body: ConfirmEmailDto) {
    return this.authLocal.confirmEmail(auth, body);
  }

  @Mutation(() => String)
  public async createEmailConfirmation(
    @GQLAuth() auth: AuthUser,
    @Args('email', { type: () => String }) email: string,
  ) {
    return this.authLocal.createEmailConfirmation(auth, email);
  }
}
