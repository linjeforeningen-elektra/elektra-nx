import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthConfirmEmailComponent } from './auth-confirm-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { SpinnerModule } from '@elektra-nx/web/shared/ui/spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':hash', component: AuthConfirmEmailComponent },
      { path: '', component: AuthConfirmEmailComponent },
    ]),
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    SpinnerModule,
  ],
  declarations: [AuthConfirmEmailComponent],
})
export class WebAuthConfirmEmailModule {}
