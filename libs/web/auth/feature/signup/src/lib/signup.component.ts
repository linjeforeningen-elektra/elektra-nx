import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AuthStore, WebAuthService } from '@elektra-nx/web/auth/data-access';
import { NavbarService } from '@elektra-nx/web/shared/data-access';
import { RegisterWithAuthLocalModel } from '@elektra-nx/shared/models';
import { Router } from '@angular/router';

const PasswordMatchesValidator: ValidatorFn = (control: AbstractControl) => {
  // const p1 = control?.get('pass');
  // const p2 = control?.get('pass_c');

  // if (!p2?.dirty) {
  //   p2?.setErrors({ password_match: null });
  // }

  // if (p1?.value == p2?.value) {
  //   // control.markAsTouched();
  //   p2?.setErrors({ password_match: null });
  // }

  // p2?.setErrors({ password_match: true });
  return null;
};

type SignupState = 'input' | 'error' | 'processing' | 'done';

@Component({
  selector: 'elektra-nx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private navbar: NavbarService,
    private fb: FormBuilder,
    private api: WebAuthService,
    private auth: AuthStore,
    private router: Router,
  ) {}

  state: SignupState = 'input';

  readonly personaliaFG = this.fb.group({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
  });

  readonly authFG = this.fb.group(
    {
      email: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
      pass_c: new FormControl('', [Validators.required]),
    },
    { validators: [PasswordMatchesValidator] },
  );

  readonly gdprFG = this.fb.group({
    consent: new FormControl(false, [Validators.requiredTrue]),
  });

  get valid() {
    return this.personaliaFG.valid && this.authFG.valid && this.gdprFG.valid;
  }

  layer = this.navbar.registerNavbarLayer({
    title: 'Register',
    theme: {
      background: 'transparent',
      color: 'var(--default-contrast)',
    },
    button: 'navigate_before',
  });

  buttonSub = this.layer.buttonClicked$.subscribe(() => {
    this.router.navigateByUrl('/auth');
  });

  public nextStep(event: Event, stepper: MatStepper) {
    event.preventDefault();
    stepper.next();
  }

  public submit(event: Event) {
    event.preventDefault();
    const name = `${this.personaliaFG.controls.fname.value} ${this.personaliaFG.controls.lname.value}`;
    const email = this.authFG.controls.email.value;
    const password = this.authFG.controls.pass.value;

    const body = {
      user: {
        name,
      },
      auth: {
        email,
        password,
      },
    } as RegisterWithAuthLocalModel;

    // this.api.register(body).subscribe({
    //   next: ({ access_token }) => {
    //     const sub = this.auth.loggedIn$
    //       .pipe(
    //         filter((loggedin) => loggedin),
    //         take(1),
    //       )
    //       .subscribe(() => {
    //         this.router.navigate(['/account']);
    //       });
    //     this.auth.login({ access_token });
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }
}
