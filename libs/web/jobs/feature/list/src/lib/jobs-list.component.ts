import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { JobService } from '@elektra-nx/web/jobs/data-access';
import { NavbarService } from '@elektra-nx/web/shared/data-access';

const _title = 'Stillingsannonser';
const _description = 'Lyst på deltidsjobb, sommerjobb eller en fulltidsjobb? Søk her!';

@Component({
  selector: 'elektra-nx-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {
  constructor(private job: JobService, private navbar: NavbarService, private meta: Meta, private title: Title) {
    this.title.setTitle(_title);
    this.meta.addTags([
      { name: 'og:title', content: _title },
      { name: 'description', content: _description },
      { name: 'og:description', content: _description },
      { name: 'og:img', content: '/assets/images/common/elekra_og.png' },
      { name: 'og:url', content: 'https://elektra.io/stillingsannonser' },
    ]);
  }

  private layer = this.navbar.registerNavbarLayer({
    title: 'Stillingsannonser',
  });

  readonly query$ = this.job.getJobs();

  ngOnInit(): void {}
}
