import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AccessRole, UpdateUserModel } from '@elektra-nx/shared/models';
import { AccountUserSlice } from '@elektra-nx/web/account/utils';

@Component({
  selector: 'elektra-nx-account-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class AccountUserComponent implements OnInit, OnDestroy, OnChanges {
  constructor(private fb: FormBuilder) {}

  readonly formGroup = this.fb.group({
    name: new FormControl(''),
    slug: new FormControl(''),
  });

  @Input()
  user?: AccountUserSlice | null;

  get confirmed(): string {
    return this.user?.roles?.includes(AccessRole.MEMBER) ? 'Godkjent bruker' : 'Venter godkjenning';
  }

  @Output()
  readonly update = new EventEmitter<{ name?: string; slug?: string }>();

  submit(event: Event) {
    event.preventDefault();
    const name = this.formGroup.controls.name.value;
    const slug = this.formGroup.controls.slug.value;

    const body: UpdateUserModel = {
      ...(name ? { name } : {}),
      ...(slug ? { slug } : {}),
    };

    this.update.emit(body);
  }

  reset(): void {
    // this.store.dispatch(userActions.reset_error());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      const change = changes['user'].currentValue;
      if (change['name']) this.formGroup.controls['name'].setValue(change['name']);
      if (change['slug']) this.formGroup.controls['slug'].setValue(change['slug']);
    }
  }

  ngOnInit(): void {
    // this.store.dispatch(userActions.load());
  }

  ngOnDestroy(): void {
    // this.formDataSub.unsubscribe();
  }
}
