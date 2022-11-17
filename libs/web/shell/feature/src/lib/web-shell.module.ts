import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DialogService,
  LayoutService,
  LocalStorageService,
  NavbarService,
  NavdrawerService,
  SnackbarService,
} from '@elektra-nx/web/shared/data-access';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@elektra-nx/web/shell/ui/layout';
import { WEB_SHELL_ROUTES } from './web-shell.routes';

import { HttpClientModule } from '@angular/common/http';
import { AuthStore } from '@elektra-nx/web/auth/data-access';
// import { AuthEffects, AuthFeatureKey, AuthReducer } from '@elektra-nx/web/auth/data-access';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { lastValueFrom, take } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    HttpClientModule,
    ApolloModule,
    PortalModule,
    OverlayModule,
    RouterModule.forRoot(WEB_SHELL_ROUTES, { scrollPositionRestoration: 'top', onSameUrlNavigation: 'reload' }),
  ],
  providers: [
    NavbarService,
    NavdrawerService,
    LayoutService,
    DialogService,
    AuthStore,
    LocalStorageService,
    SnackbarService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink, authStore: AuthStore) => {
        const auth = setContext(async (operation, context) => {
          const token = await lastValueFrom(authStore.token$.pipe(take(1)));

          if (!token) {
            return {};
          } else {
            return {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
          }
        });

        const link = ApolloLink.from([auth, httpLink.create({ uri: '/graphql' })]);
        const cache = new InMemoryCache();

        return {
          link,
          cache,
        };
      },
      deps: [HttpLink, AuthStore],
    },
  ],
  exports: [RouterModule],
})
export class WebShellModule {}
