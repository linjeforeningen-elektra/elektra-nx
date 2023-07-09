import { Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { WebNavbarService } from '@elektra-nx/web/shared/data-access';

const _title = 'Ny student';
const _description = 'Informasjon for nye studenter.';

@Component({
  selector: 'elektra-nx-web-new-student',
  templateUrl: './web-new-student.component.html',
  styles: [],
})
export class WebNewStudentComponent implements OnDestroy {
  constructor(private navbar: WebNavbarService, private title: Title, private meta: Meta) {
    this.title.setTitle(_title);
    this.meta.addTags([
      { name: 'og:title', content: _title },
      { name: 'description', content: _description },
      { name: 'og:description', content: _description },
      { name: 'og:image', content: '/assets/images/common/elektra_og.png' },
      { name: 'og:url', content: 'https://elektra.io/ny-student' },
    ]);
  }

  private layer = this.navbar.registerNavbarLayer({
    title: 'Ny student',
  });

  ngOnDestroy(): void {
    this.layer.release();
  }
}
