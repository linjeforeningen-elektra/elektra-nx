import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { UserListQuery } from '@elektra-nx/web/admin/data-access';
import { FormBuilder, FormControl } from '@angular/forms';
import { FindUserFilterModel } from '@elektra-nx/shared/models';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'elektra-nx-web-admin-feature-user-list',
  templateUrl: './web-admin-feature-user-list.component.html',
  styleUrls: ['./web-admin-feature-user-list.component.scss'],
})
export class WebAdminFeatureUserListComponent implements OnInit {
  constructor(private apollo: Apollo, private fb: FormBuilder) {}

  // @ViewChild('search', { static: true, read: MatInput }) private search: MatInput;

  nameFormGroup = this.fb.group({
    name: new FormControl('', { nonNullable: true }),
  });

  private filter: FindUserFilterModel = {
    name: undefined,
  };

  private usersQuery = this.apollo.watchQuery({
    query: UserListQuery,
    variables: {
      filter: {
        pagination: {
          page: 0,
          page_size: 10,
        },
      },
    },
  });

  public readonly usersQuery$ = this.usersQuery.valueChanges;

  nameFormGroupSub = this.nameFormGroup.valueChanges.pipe(debounceTime(40)).subscribe(() => {
    const name = this.nameFormGroup.controls.name.value;

    if (name != undefined) {
      this.filter.name = name;
      this.usersQuery.refetch({ filter: this.filter });
    }
  });

  ngOnInit(): void {}
}
