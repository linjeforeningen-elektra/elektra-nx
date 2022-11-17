import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobModel } from '@elektra-nx/shared/models';
import { NavbarService } from '@elektra-nx/web/shared/data-access';

@Component({
  selector: 'elektra-nx-jobs-detail',
  templateUrl: './jobs-detail.component.html',
  styleUrls: ['./jobs-detail.component.scss'],
})
export class JobsDetailComponent implements OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute, private navbar: NavbarService) {}

  private layer = this.navbar.registerNavbarLayer({
    button: 'navigate_before',
    title: '',
  });
  private buttonSub = this.layer.buttonClicked$.subscribe(() => {
    this.router.navigate(['../'], { relativeTo: this.route });
  });

  get job(): JobModel | undefined {
    return this.route.snapshot.data['job'];
  }

  ngOnDestroy(): void {
    this.layer.release();
  }
}
