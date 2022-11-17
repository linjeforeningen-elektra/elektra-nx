import { Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavbarService } from '@elektra-nx/web/shared/data-access';

const _title = 'Kontakt';
const _description = 'Ta kontakt med oss';

@Component({
  selector: 'elektra-nx-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnDestroy {
  constructor(private navbar: NavbarService, private title: Title, private meta: Meta) {
    this.title.setTitle(_title);
    this.meta.addTags([
      { name: 'og:title', content: _title },
      { name: 'description', content: _description },
      { name: 'og:description', content: _description },
      { name: 'og:image', content: '/assets/images/common/elektra_og.png' },
      { name: 'og:url', content: 'https://elektra.io/kontakt' },
    ]);
  }

  private layer = this.navbar.registerNavbarLayer({
    title: 'Kontakt',
  });

  ngOnDestroy(): void {
    this.layer.release();
  }
}
