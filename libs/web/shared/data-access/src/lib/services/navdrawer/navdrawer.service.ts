import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { NavdrawerReducer } from '../../helpers';
import { NavdrawerLink } from '../../interfaces';

export const LINKS: NavdrawerLink[] = [
  { title: 'Hjem', icon: 'home', path: '/hjem', group: '' },
  { title: 'Stillingsannonser', path: '/stillingsannonser', icon: 'work', group: '' },
  // { title: 'News', icon: 'feed', path: '/feed', group: '' },
];

@Injectable({
  providedIn: 'root',
})
export class NavdrawerService {
  private opened: BehaviorSubject<boolean> = new BehaviorSubject(<boolean>false);
  public readonly state$ = this.opened.asObservable();

  private links: BehaviorSubject<NavdrawerLink[]> = new BehaviorSubject(<NavdrawerLink[]>LINKS);
  public readonly groups$ = this.links.asObservable().pipe(map((links) => NavdrawerReducer(links)));

  public setLinks(links: NavdrawerLink[]): void {
    this.links.next(links);
  }

  open(): void {
    this.opened.next(true);
  }

  close(): void {
    this.opened.next(false);
  }
}
