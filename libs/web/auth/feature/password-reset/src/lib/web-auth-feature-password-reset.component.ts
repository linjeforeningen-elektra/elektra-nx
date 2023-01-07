import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isApolloError } from '@apollo/client/errors';
import { CreatePasswordResetMutation, ResetPasswordByHashMutation } from '@elektra-nx/web/auth/data-access';
import { WebNavbarService } from '@elektra-nx/web/shared/data-access';
import { Apollo } from 'apollo-angular';
import { catchError, EMPTY, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'elektra-nx-web-auth-feature-password-reset',
  templateUrl: './web-auth-feature-password-reset.component.html',
  styleUrls: ['./web-auth-feature-password-reset.component.scss'],
})
export class WebAuthFeaturePasswordResetComponent implements OnDestroy {
  constructor(
    private readonly navbar: WebNavbarService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
  ) {}

  private readonly layer = this.navbar.registerNavbarLayer({
    button: 'navigate_before',
  });

  state: 'loading' | 'input-password' | 'done-create' | 'done-reset' | 'error' = 'error';
  error?: string = 'Det har skjedd en ukjent feil';
  email?: string;
  hash?: string;

  formGroup = this.fb.group({
    password: new FormControl('', { validators: [Validators.required], nonNullable: false }),
  });

  get valid() {
    return this.formGroup.valid;
  }

  buttonSub = this.layer.buttonClicked$.subscribe(() => {
    this.router.navigate(['/auth']);
  });

  hashSub = this.route.params
    .pipe(
      take(1),
      tap((params) => {
        const hash = <string>params['hash'];

        if (!hash) {
          return EMPTY;
        }

        this.state = 'input-password';
        this.hash = hash;

        return EMPTY;
      }),
    )
    .subscribe();

  routeParamSub = this.route.queryParams
    .pipe(
      take(1),
      switchMap((params) => {
        const email = <string>params['email'];

        if (!email) {
          return EMPTY;
        }

        this.state = 'loading';
        return this.apollo
          .mutate({
            mutation: CreatePasswordResetMutation,
            variables: { email },
          })
          .pipe(
            catchError((err) => {
              this.error = 'Det skjedde en ukjent feil.';

              if (isApolloError(err)) {
                this.error = err.message;
              }

              return EMPTY;
            }),
            tap(({ data }) => {
              this.state = 'done-create';
              this.email = data?.email;
            }),
          );
      }),
    )
    .subscribe();

  submit(event?: Event) {
    event?.preventDefault();

    this.state = 'loading';
    const password = <string>this.formGroup.controls.password.value;
    const hash = <string>this.hash;

    this.apollo
      .mutate({
        mutation: ResetPasswordByHashMutation,
        variables: {
          password,
          hash,
        },
      })
      .pipe(
        catchError((err) => {
          if (isApolloError(err)) {
            this.error = err.message;
          }

          this.state = 'error';
          return EMPTY;
        }),
      )
      .subscribe(({ data }) => {
        if (!data?.email) return;
        this.state = 'done-reset';
      });
  }

  ngOnDestroy(): void {
    this.layer.release();
  }
}
