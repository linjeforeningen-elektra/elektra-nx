import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAuthFeaturePasswordResetComponent } from './web-auth-feature-password-reset.component';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from '@elektra-nx/web/shared/ui/spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
