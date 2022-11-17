import { Injectable } from '@angular/core';
import { RegisterWithAuthLocalModel } from '@elektra-nx/shared/models';
import { Apollo } from 'apollo-angular';
import { SignupMutation } from '../graphql';

@Injectable({
  providedIn: 'root',
})
export class WebAuthService {
  constructor(private apollo: Apollo) {}

  public signup(body: RegisterWithAuthLocalModel) {
    return this.apollo.mutate({
      mutation: SignupMutation,
      variables: { body },
    });
  }
}
