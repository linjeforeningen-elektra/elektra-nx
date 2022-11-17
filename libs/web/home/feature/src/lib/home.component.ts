import { Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavbarService } from '@elektra-nx/web/shared/data-access';

const _title = 'Elektra';
const _description = `Linjeforeningen for Elektroingeniør og Elektrifisering og Digitalisering ved NTNU`;

@Component({
  selector: 'elektra-nx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  constructor(private navbar: NavbarService, private title: Title, private meta: Meta) {
    this.title.setTitle('Elektra');
    this.meta.addTags([
      { name: 'og:title', content: _title },
      { name: 'description', content: _description },
      { name: 'og:description', content: _description },
      { name: 'og:image', content: '/assets/common/elektra_og.png' },
      { name: 'og:url', content: 'https://elektra.io/' },
    ]);
  }

  private layer = this.navbar.registerNavbarLayer({
    title: '',
    theme: {
      background: 'transparent',
      color: '#FFF',
    },
  });

  ngOnDestroy(): void {
    this.layer.release();
  }
}
