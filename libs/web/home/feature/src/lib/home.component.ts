import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavbarService } from '@elektra-nx/web/shared/data-access';

@Component({
  selector: 'elektra-nx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  constructor(private navbar: NavbarService, private title: Title) {
    this.title.setTitle('Elektra');
  }

  private layer = this.navbar.registerNavbarLayer({
    title: 'Home',
    theme: {
      background: 'transparent',
      color: '#FFF',
    },
  });

  ngOnDestroy(): void {
    this.layer.release();
  }
}
