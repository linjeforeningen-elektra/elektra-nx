import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeTextModule } from '@elektra-nx/web/shell/ui/fade-text';
import { SpinButtonModule } from '@elektra-nx/web/shell/ui/spin-button';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, FadeTextModule, SpinButtonModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
