import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavbarService } from '../navbar/navbar.service';
import { map, Observable } from 'rxjs';
import { NavbarLayerInstance } from '../../classes/navbar-layer-instance.class';
import { NavbarLayer } from '../../interfaces/navbar-layer.interface';

enum Breakpoints {
  MOBILE = '(min-width: 320px)',
  IMOBILE = '(max-width: 320px)',
  TABLET = '(min-width: 600px)',
  DESKTOP = '(min-width: 900px)',
  DESKTOP_L = '(min-width: 1300px)',
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private readonly navbar: NavbarService, private readonly bps: BreakpointObserver) {}

  public readonly breakpoints = Breakpoints;

  public readonly breakpoints$: Observable<Record<Breakpoints, boolean>> = this.bps
    .observe(Object.values(this.breakpoints))
    .pipe(map((state) => state.breakpoints as Record<Breakpoints, boolean>));

  public registerNavbarLayer<T extends NavbarLayer>(props: Omit<T, 'id'>): NavbarLayerInstance<T> {
    return this.navbar.registerNavbarLayer<T>(props);
  }
}
