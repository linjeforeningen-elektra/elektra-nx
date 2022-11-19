import { Injectable } from '@angular/core';
import {
  CreateCardModel,
  CreateMembershipModel,
  UpdateMembershipModel,
  UpdateUserModel,
} from '@elektra-nx/shared/models';
import { AuthStore } from '@elektra-nx/web/auth/data-access';
import { SnackbarService } from '@elektra-nx/web/shared/data-access';
import { Apollo } from 'apollo-angular';
import { tap } from 'rxjs';
import {
  AccountGQLQuery,
  AccountResponse,
  CreateCardMutation,
  CreateMembershipMutation,
  DeleteCardMutation,
  RenewCardAccessMutation,
  UpdateMembershipMutation,
  UpdateUserMutation,
  UpdateUserMutationResponse,
  UpdateUserMutationVariables,
} from '../apollo';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private auth: AuthStore, private apollo: Apollo, private snackBar: SnackbarService) {}

  private accountQuery = this.apollo.watchQuery<AccountResponse, null>({
    query: AccountGQLQuery,
  });

  readonly account$ = this.accountQuery.valueChanges;

  public updateAccountUser(body: UpdateUserModel) {
    const userId = this.accountQuery.getCurrentResult().data.account.id;

    this.apollo
      .mutate<UpdateUserMutationResponse, UpdateUserMutationVariables>({
        mutation: UpdateUserMutation,
        variables: {
          userId,
          body,
        },
        optimisticResponse: (vars) => {
          const { data } = this.accountQuery.getCurrentResult();
          const id = data.account.id;
          const name = data.account.name;
          const slug = data.account.slug;

          return {
            user: {
              id,
              name: vars.body.name || name,
              slug: vars.body.slug || slug,
            },
          };
        },
      })
      .pipe(tap({ next: () => this.snackBar.open('User updated.') }))
      .subscribe();
  }

  private createAccountMembership(body: CreateMembershipModel): void {
    const userId = this.accountQuery.getCurrentResult().data.account.id;
    this.apollo
      .mutate({
        mutation: CreateMembershipMutation,
        variables: {
          userId,
          body,
        },
        update: (store, { data }) => {
          const cache = store.readQuery({ query: AccountGQLQuery });

          if (!cache) {
            console.error('No cache.');
            return;
          }

          if (!data?.membership) {
            console.error('No membership in data?');
            return;
          }

          const account = {
            ...cache.account,
            membership: data.membership,
          };

          store.writeQuery({ query: AccountGQLQuery, data: { account } });
        },
      })
      .pipe(tap({ next: () => this.snackBar.open('Membership created.') }))
      .subscribe();
  }

  private updateAccountMembership(body: UpdateMembershipModel): void {
    const membership = this.accountQuery.getCurrentResult().data.account.membership;
    if (!membership) return;

    this.apollo
      .mutate({
        mutation: UpdateMembershipMutation,
        variables: {
          body,
          membershipId: membership.id,
        },
        update: (store, { data }) => {
          const cache = store.readQuery({ query: AccountGQLQuery });

          if (!cache) {
            console.error(`No cache?`);
            return;
          }

          if (!data?.membership) {
            console.error(`No membership in data?`);
            return;
          }

          const account = {
            account: {
              ...cache.account,
              membership: data.membership,
            },
          };

          store.writeQuery({ query: AccountGQLQuery, data: account });
        },
      })
      .pipe(tap({ next: () => this.snackBar.open('Membership updated.') }))
      .subscribe();
  }

  public putAccountMembership(body: UpdateMembershipModel | CreateMembershipModel) {
    const { membership } = this.accountQuery.getCurrentResult().data.account;

    if (membership) {
      this.updateAccountMembership(body);
    } else {
      this.createAccountMembership(<CreateMembershipModel>body);
    }
  }

  public createAccountCard(body: CreateCardModel): void {
    const userId = this.accountQuery.getCurrentResult().data.account.id;
    this.apollo
      .mutate({
        mutation: CreateCardMutation,
        variables: {
          userId,
          body,
        },
        refetchQueries: [{ query: AccountGQLQuery }],
      })
      .subscribe();
  }

  public deleteAccountCard(): void {
    const cardId = this.accountQuery.getCurrentResult().data.account.card?.id;
    if (!cardId) return;
    this.apollo
      .mutate({
        mutation: DeleteCardMutation,
        variables: {
          cardId,
        },
        refetchQueries: [{ query: AccountGQLQuery }],
      })
      .subscribe();
  }

  public renewCardAccess(): void {
    const cardId = this.accountQuery.getCurrentResult().data.account.card?.id;
    if (!cardId) return;
    this.apollo
      .mutate({
        mutation: RenewCardAccessMutation,
        variables: {
          cardId,
        },
        refetchQueries: [{ query: AccountGQLQuery }],
      })
      .subscribe();
  }
}
