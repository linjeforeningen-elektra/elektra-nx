import { NavdrawerRoute } from '../interfaces';

const LOGGED_IN_ROUTES: NavdrawerRoute[] = [
  { path: '/konto', icon: 'dashboard', name: 'Oversikt', group: 'Bruker' },
  { path: '/konto/medlemskap', icon: 'settings', name: 'Medlemskap', group: 'Bruker' },
];
const DEFAULT_ROUTES: NavdrawerRoute[] = [
  { path: '/', icon: 'home', name: 'Hjem' },
  { path: '/stillingsannonser', icon: 'engineering', name: 'Stillingsannonser' },
];

export function navdrawerRoutesSelector(loggedIn: boolean) {
  return loggedIn ? [...LOGGED_IN_ROUTES, ...DEFAULT_ROUTES] : DEFAULT_ROUTES;
}

export function routeSerializer(loggedIn: boolean) {
  const routes = navdrawerRoutesSelector(loggedIn);

  return routes.reduce((acc, cur) => {
    if (cur.group) {
      const groupIndex = acc.findIndex((g) => g.group === cur.group);

      if (groupIndex > -1) {
        acc[groupIndex].routes.push(cur);
      } else {
        acc.push({ group: cur.group, routes: [cur] });
      }
    } else {
      acc.push({ routes: [cur] });
    }

    return acc;
  }, <{ group?: string; routes: NavdrawerRoute[] }[]>[]);
}
