import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isApolloError } from '@apollo/client/errors';
import { ConfirmEmailModel } from '@elektra-nx/shared/models';
import { ConfirmEmailMutation, CreateEmailConfirmationMutation } from '@elektra-nx/web/auth/data-access';
import { WebAuthService, WebNavbarService } from '@elektra-nx/web/shared/data-access';
import { Apollo } from 'apollo-angular';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'elektra-nx-auth-confirm-email',
  templateUrl: './auth-confirm-email.component.html',
  styleUrls: ['./auth-confirm-email.component.scss'],
})
export class AuthConfirmEmailComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private navbar: WebNavbarService,
    private apollo: Apollo,
    private auth: WebAuthService,
  ) {}

  loading = false;
  error?: string;
  success = false;
  email?: string;

  private readonly layer = this.navbar.registerNavbarLayer({
    title: 'Bekreft e-post',
    button: 'navigate_before',
  });

  readonly formGroup = this.fb.group({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    code: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  get valid() {
    return this.formGroup.valid;
  }

  private readonly buttonSub = this.layer.buttonClicked$.subscribe(async () => {
    this.router.navigateByUrl('/auth');
  });
  private readonly emailSub = this.route.queryParams.subscribe((params) => this.setEmail(params['email']));

  readonly hash$: Observable<string | undefined> = this.route.params.pipe(map((params) => params['hash']));
  private readonly hashSub = this.hash$.subscribe((hash) => {
    if (hash) {
      const body: Record<string, unknown> = jwtDecode(hash);

      if (body['email'] && body['code']) {
        this.setEmail(<string>body['email']);
        this.formGroup.controls.code.setValue(<string>body['code']);
        this.submit();
      }
    }
  });

  setEmail(email?: string): void {
    if (email) {
      this.email = email;
      this.formGroup.controls.email.setValue(email);
      this.formGroup.controls.email.disable();
    } else {
      this.formGroup.controls.email.enable();
      this.email = undefined;
    }
  }

  public submit(event?: Event): void {
    event?.preventDefault();
    this.error = undefined;
    this.loading = true;

    const body = this.formGroup.value as ConfirmEmailModel;
    if (this.email) {
      body.email = this.email;
    }

    this.apollo
      .mutate({
        mutation: ConfirmEmailMutation,
        variables: { body },
      })
      .pipe(
        catchError((err) => {
          if (isApolloError(err)) {
            this.error = err.message;
          }
          this.loading = false;

          return EMPTY;
        }),
      )
      .subscribe((result) => {
        this.error = undefined;
        this.loading = false;
        if (!result.data) return;

        const { access_token } = result.data.user;
        this.auth.login(access_token);
        this.router.navigateByUrl('/konto');
      });
  }

  resendEmail(): void {
    const email = this.formGroup.controls.email.value || this.email;

    if (!email) {
      this.error = 'Du må fylle inn e-post.';
      return;
    }

    this.error = undefined;
    this.loading = true;
    this.apollo
      .mutate({
        mutation: CreateEmailConfirmationMutation,
        variables: { email },
      })
      .pipe(
        catchError((error) => {
          this.loading = false;

          if (isApolloError(error)) {
            this.error = error.message;
          }

          return EMPTY;
        }),
      )
      .subscribe((result) => {
        if (!result.data?.email) return;
        this.setEmail(email);
        this.success = true;
        this.loading = false;
        this.error = undefined;
      });
  }

  ngOnInit(): void {
    this.hash$.subscribe();
  }

  ngOnDestroy(): void {
    this.layer.release();
    this.emailSub.unsubscribe();
  }
}
