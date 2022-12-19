import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { WebNavbarService, WebAuthService } from '@elektra-nx/web/shared/data-access';
import { LoginWithAuthLocalModel } from '@elektra-nx/shared/models';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LoginWithAuthLocalMutation } from '@elektra-nx/web/auth/utils';
import { catchError, EMPTY } from 'rxjs';
import { isApolloError } from '@apollo/client/errors';

@Component({
  selector: 'elektra-nx-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnDestroy {
  constructor(
    private navbar: WebNavbarService,
    private fb: FormBuilder,
    private auth: WebAuthService,
    private router: Router,
    private apollo: Apollo,
  ) {}

  error?: string;
  loading = false;

  formGroup = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  private readonly layer = this.navbar.registerNavbarLayer({
    title: 'Logg inn',
  });

  get valid() {
    return this.formGroup.valid;
  }

  submit(event: Event) {
    this.error = undefined;
    this.loading = true;
    event.preventDefault();
    const body = this.formGroup.value as LoginWithAuthLocalModel;
    this.apollo
      .mutate({ mutation: LoginWithAuthLocalMutation, variables: { body } })
      .pipe(
        catchError((error) => {
          this.loading = false;
          if (isApolloError(error)) {
            this.error = error.message;
          }
          return EMPTY;
        }),
      )
      .subscribe(({ data }) => {
        if (!data) return;
        this.loading = false;
        this.error = undefined;
        const { access_token } = data.session;

        this.auth.login(access_token);
        this.router.navigateByUrl('/konto');
      });
  }

  ngOnDestroy(): void {
    this.layer.release();
  }
}
