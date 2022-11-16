import { NavdrawerLink } from '../interfaces/navdrawer-link.interface';

export type NavdrawerGroup = {
  group: string;
  links: NavdrawerLink[];
};

export function NavdrawerReducer(links: NavdrawerLink[]): NavdrawerGroup[] {
  return links.reduce(
    (a, c) => {
      const idx = a.findIndex((g) => g.group === c.group);

      if (idx > -1) {
        a[idx].links.push(c);
      } else {
        const newGroup: NavdrawerGroup = { group: <string>c.group, links: [c] };
        a.push(newGroup);
      }

      return a;
    },
    <NavdrawerGroup[]>[{ group: '', links: [] }],
  );
}
