import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAuthFeaturePasswordResetComponent } from './web-auth-feature-password-reset.component';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from '@elektra-nx/web/shared/ui/spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: WebAuthFeaturePasswordResetComponent },
      { path: ':hash', component: WebAuthFeaturePasswordResetComponent },
    ]),
    SpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [WebAuthFeaturePasswordResetComponent],
  exports: [WebAuthFeaturePasswordResetComponent],
})
export class WebAuthFeaturePasswordResetModule {}
