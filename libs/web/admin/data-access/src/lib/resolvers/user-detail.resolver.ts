import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { isApolloError } from '@apollo/client/errors';
import { Apollo } from 'apollo-angular';
import { catchError, map, Observable, of } from 'rxjs';
import { UserDetailQuery, UserDetailQueryResult } from '../graphql';

@Injectable()
export class WebUserDetailResolver implements Resolve<UserDetailQueryResult['user'] | { error: string }> {
  constructor(private apollo: Apollo) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<UserDetailQueryResult['user'] | { error: string }> {
    const userId = route.params['userId'];

    return this.apollo
      .query({
        query: UserDetailQuery,
        variables: { userId },
      })
      .pipe(
        map(({ data }) => {
          return data.user;
        }),
        catchError((err) => {
          if (isApolloError(err)) {
            return of({ error: err.message });
          }

          return of({ error: 'Det skjedde en feil' });
        }),
      );
  }
}
