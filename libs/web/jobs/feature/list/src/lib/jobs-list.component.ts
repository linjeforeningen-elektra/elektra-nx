import { Component, OnInit } from '@angular/core';
import { JobService } from '@elektra-nx/web/jobs/data-access';
import { NavbarService } from '@elektra-nx/web/shared/data-access';

@Component({
  selector: 'elektra-nx-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {
  constructor(private job: JobService, private navbar: NavbarService) {}

  private layer = this.navbar.registerNavbarLayer({
    title: 'Stillingsannonser',
  });

  readonly data$ = this.job.state$;

  ngOnInit(): void {
    this.data$.subscribe((s) => console.log(s));
  }
}
