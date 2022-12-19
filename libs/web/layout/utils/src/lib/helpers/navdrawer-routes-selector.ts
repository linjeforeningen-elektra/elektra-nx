import { NavdrawerRoute } from '../interfaces';

const LOGGED_IN_ROUTES: NavdrawerRoute[] = [
  { path: '/account', icon: 'dashboard', name: 'Dashboard', group: 'For you' },
  { path: '/account/settings', icon: 'settings', name: 'Settings', group: 'For you' },
];
const DEFAULT_ROUTES: NavdrawerRoute[] = [{ path: '/', icon: 'home', name: 'Home' }];

export function navdrawerRoutesSelector(loggedIn: boolean) {
  return loggedIn ? [...LOGGED_IN_ROUTES, ...DEFAULT_ROUTES] : DEFAULT_ROUTES;
}

export function routeSerializer(loggedIn: boolean) {
  const routes = navdrawerRoutesSelector(loggedIn);

  return routes.reduce((a, c) => {
    const gIdx = a.findIndex((g) => g.group === c.group);

    if (gIdx > -1) {
      a[gIdx].routes.push(c);
    } else {
      if (c.group != undefined) {
        a.push({ group: c.group, routes: [c] });
      } else {
        a.push({ routes: [c] });
      }
    }

    return a;
  }, <{ group?: string; routes: NavdrawerRoute[] }[]>[]);
}
