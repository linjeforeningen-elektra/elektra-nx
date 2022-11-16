import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipEditComponent } from './membership-edit.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
