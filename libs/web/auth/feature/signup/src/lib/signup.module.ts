import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';

import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SpinnerModule } from '@elektra-nx/web/shared/ui/spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SignupComponent }]),
    MatStepperModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    SpinnerModule,
  ],
  declarations: [SignupComponent],
})
export class SignupModule {}
