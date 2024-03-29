import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WebNavbarService } from '@elektra-nx/web/shared/data-access';
import { membershipTerms, immatriculationTerms, graduationTerms, specialisations } from '@elektra-nx/web/account/utils';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CreateMembershipModel } from '@elektra-nx/shared/models';
import { DashboardService } from '@elektra-nx/web/account/data-access';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'elektra-nx-membership-edit',
  templateUrl: './membership-edit.component.html',
  styleUrls: ['./membership-edit.component.scss'],
  providers: [],
})
export class MembershipEditComponent implements OnDestroy {
  constructor(
    private navbar: WebNavbarService,
    private router: Router,
    private fb: FormBuilder,
    private dashboard: DashboardService,
    private title: Title,
  ) {
    title.setTitle('Medlemskap');
  }

  readonly formGroup = this.fb.group({
    address: new FormControl('', [Validators.required]),
    postal_code: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    memberyear: new FormControl<Date | null>(null, [Validators.required]),
    immatriculation: new FormControl<Date | null>(null, [Validators.required]),
    graduation: new FormControl<Date | null>(null, []),
    specialisation: new FormControl('', []),
    gender: new FormControl('', []),
  });

  get valid(): boolean {
    return this.formGroup.valid;
  }

  memberYears = membershipTerms;
  immatriculationYears = immatriculationTerms;
  graduationYears = graduationTerms;
  specialisations = specialisations;

  readonly layer = this.navbar.registerNavbarLayer({
    title: 'Medlemskap',
    button: 'navigate_before',
  });

  buttonSub = this.layer.buttonClicked$.subscribe(() => {
    this.router.navigateByUrl('/konto');
  });

  membership$ = this.dashboard.account$.pipe(
    map(({ data }) => data.account.membership || <any>{}),
    tap((data) => {
      if (data?.address) this.formGroup.controls['address'].setValue(data.address);
      if (data?.postal_code) this.formGroup.controls['postal_code'].setValue(data.postal_code);
      if (data?.phone) this.formGroup.controls['phone'].setValue(data.phone);
      if (data?.gender) this.formGroup.controls['gender'].setValue(data.gender);
      if (data?.memberyear) {
        const semesters = this.immatriculationYears.flatMap((y) => y.semesters);
        const found = semesters.find((s) => s.value.getTime() == new Date(<Date>data.memberyear).getTime());
        if (found) this.formGroup.controls['memberyear'].setValue(found.value);
      }
      if (data?.immatriculation) {
        const semesters = this.immatriculationYears.flatMap((y) => y.semesters);
        const found = semesters.find((s) => s.value.getTime() == new Date(<Date>data.immatriculation).getTime());
        if (found) this.formGroup.controls['immatriculation'].setValue(found.value);
      }
      if (data?.graduation && data?.graduation != undefined) {
        const semesters = this.graduationYears.flatMap((y) => y.semesters);
        const found = semesters.find((s) => s.value.toDateString() == new Date(<Date>data.graduation).toDateString());
        if (found) this.formGroup.controls['graduation'].setValue(found.value);
      }
      if (data?.specialisation) {
        this.formGroup.controls['specialisation'].setValue(data.specialisation);
      }
    }),
  );

  submit(event: Event) {
    event.preventDefault();
    const body = this.formGroup.value as CreateMembershipModel;
    this.dashboard.putAccountMembership(body);
  }

  ngOnDestroy(): void {
    this.layer.release();
  }
}
