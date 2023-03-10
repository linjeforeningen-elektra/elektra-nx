import { Apollo } from 'apollo-angular';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserListQuery, UserListQueryResult } from '@elektra-nx/web/admin/data-access';
import { FormBuilder, FormControl } from '@angular/forms';
import { AccessRole, FindUserFilterModel, PaginationOptionsModel } from '@elektra-nx/shared/models';
import { debounceTime, Subscription } from 'rxjs';
import { isApolloError } from '@apollo/client/errors';
import { BreakpointObserver } from '@angular/cdk/layout';
import { WebNavbarService } from '@elektra-nx/web/shared/data-access';

type Filter = Omit<FindUserFilterModel, 'pagination'> & { pagination: PaginationOptionsModel };

@Component({
  selector: 'elektra-nx-web-admin-feature-user-list',
  templateUrl: './web-admin-feature-user-list.component.html',
  styleUrls: ['./web-admin-feature-user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebAdminFeatureUserListComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private bpr: BreakpointObserver,
    private navbar: WebNavbarService,
  ) {}

  private layer = this.navbar.registerNavbarLayer({
    title: 'Brukere',
  });

  get limit(): number {
    if (this.bpr.isMatched('(min-width: 1200px)')) return 40;
    if (this.bpr.isMatched('(min-width: 700px)')) return 20;
    return 10;
  }

  roles = Object.values(AccessRole).filter((e) => e !== AccessRole.ANONYMOUS);

  get sort_str(): string {
    return `${this.filter.orderBy?.prop}`;
  }

  get more(): boolean {
    return this.filter.pagination.offset + this.filter.pagination.limit <= this.users.length;
  }

  nameFormGroup = this.fb.group({
    name: new FormControl<string>('', { nonNullable: true }),
  });

  rolesFormGroup = this.fb.group({
    roles: new FormControl<string[]>([], { nonNullable: true }),
    invert: new FormControl<boolean>(false, { nonNullable: true }),
  });

  private filter: Filter = {
    name: '',
    pagination: {
      limit: this.limit,
      offset: 0,
    },
    orderBy: {
      prop: 'name',
      direction: 'ASC',
    },
  };

  users: UserListQueryResult['users'] = [];
  error?: string;

  private usersQuery = this.apollo.watchQuery({
    query: UserListQuery,
    variables: {
      filter: this.filter,
    },
    fetchPolicy: 'network-only',
  });

  querySub: Subscription = this.usersQuery.valueChanges.subscribe(({ data, error }) => {
    this.users = data.users;

    if (error) {
      this.error = 'Det skjedde en ukjent feil.';
      if (isApolloError(error)) {
        this.error = error.message;
      }
    }

    this.cdr.detectChanges();
  });

  nameFormGroupSub = this.nameFormGroup.valueChanges.pipe(debounceTime(200)).subscribe(() => {
    this.update();
  });

  rolesFormGroupSub = this.rolesFormGroup.valueChanges.subscribe(() => {
    this.update();
  });

  public update(): void {
    const name = this.nameFormGroup.controls.name.value;
    const roles = this.rolesFormGroup.controls.roles.value as AccessRole[];
    const invert = this.rolesFormGroup.controls.invert.value;

    this.filter.pagination.offset = 0;

    if (name != undefined) {
      this.filter.name = name;
    }

    if (roles != undefined) {
      if (invert) {
        delete this.filter.roles;
        this.filter._roles = roles;
      } else {
        delete this.filter._roles;
        this.filter.roles = roles;
      }
    }

    this.usersQuery.refetch({
      filter: this.filter,
    });

    this.cdr.detectChanges();
  }

  public loadMore() {
    const offset = this.users.length;
    this.filter.pagination.offset = offset;

    this.usersQuery.fetchMore({
      variables: { filter: this.filter },
    });

    this.cdr.detectChanges();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.layer.release();
    this.querySub.unsubscribe();
    this.nameFormGroupSub.unsubscribe();
    this.rolesFormGroupSub.unsubscribe();
  }
}
