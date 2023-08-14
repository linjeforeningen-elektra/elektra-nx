import { Injectable } from '@angular/core';
import { NavdrawerRoute, routeSerializer } from '@elektra-nx/web/layout/utils';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavdrawerService {
  private list = new BehaviorSubject<Observable<NavdrawerRoute[]>[]>([]);

  routes$ = this.list.pipe(
    switchMap((list) => combineLatest(list)),
    map((list) => routeSerializer(list.flat())),
  );

  public registerRoutes(routes: NavdrawerRoute[]): void;
  public registerRoutes(routes: Observable<NavdrawerRoute[]>): void;
  public registerRoutes(routes: NavdrawerRoute[] | Observable<NavdrawerRoute[]>): void {
    const value = this.list.value;

    this.list.next([...value, routes instanceof Observable ? routes : of(routes)]);
  }
}
