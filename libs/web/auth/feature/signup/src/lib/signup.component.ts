import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { WebNavbarService, WebAuthService } from '@elektra-nx/web/shared/data-access';
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
export class SignupComponent implements OnDestroy {
  constructor(
    private navbar: WebNavbarService,
    private fb: FormBuilder,
    private auth: WebAuthService,
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
    title: 'Ny bruker',
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

    // this.api.signup(body).subscribe((response) => {
    //   if (response.errors && response.errors.length > 0) throw 'Error';
    //   if (!response.data?.result) throw 'No token';
    //   this.auth.login(response.data.result.access_token);
    //   this.router.navigateByUrl('/konto');
    // });
  }

  ngOnDestroy(): void {
    this.layer.release();
  }
}
