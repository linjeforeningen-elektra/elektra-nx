import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipEditComponent } from './membership-edit.component';
import { RouterModule } from '@angular/router';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { SpinnerModule } from '@elektra-nx/web/shared/ui/spinner';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatAutocompleteModule,
    SpinnerModule,
    RouterModule.forChild([{ path: '', component: MembershipEditComponent }]),
  ],
  declarations: [MembershipEditComponent],
  providers: [],
})
export class MembershipEditModule {}
