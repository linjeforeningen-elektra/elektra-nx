import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { NavbarService } from '@elektra-nx/web/shared/data-access';
import { AuthStore } from '@elektra-nx/web/auth/data-access';
import { LoginWithAuthLocalModel } from '@elektra-nx/shared/models';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LoginWithAuthLocalMutation } from '@elektra-nx/web/auth/utils';

type SigninState = 'input' | 'processing' | 'error' | 'success';

@Component({
  selector: 'elektra-nx-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnDestroy {
  constructor(
    private navbar: NavbarService,
    private fb: FormBuilder,
    private auth: AuthStore,
    private router: Router,
    private apollo: Apollo,
  ) {}

  state: SigninState = 'input';
  error?: string;

  formGroup = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  private readonly layer = this.navbar.registerNavbarLayer({
    title: 'Logg inn',
    theme: {
      background: 'transparent',
      color: 'var(--default-contrast)',
    },
  });

  get valid() {
    return this.formGroup.valid;
  }

  submit(event: Event) {
    event.preventDefault();
    const body = this.formGroup.value as LoginWithAuthLocalModel;
    this.apollo.mutate({ mutation: LoginWithAuthLocalMutation, variables: { body } }).subscribe(({ data, errors }) => {
      if (errors && errors.length > 0) return;
      if (!data) return;

      const { access_token } = data.session;

      this.auth.login(access_token);
      this.router.navigateByUrl('/konto');
    });
  }

  ngOnDestroy(): void {
    this.layer.release();
  }
}
