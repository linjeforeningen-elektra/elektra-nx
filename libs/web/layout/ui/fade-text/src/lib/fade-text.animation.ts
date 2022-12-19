import { trigger, transition, animate, style, query, group } from '@angular/animations';

export const FADE_TEXT_ANIMATION = trigger('FadeText', [
  transition(':enter', [query('.current', [style({ opacity: 0 }), animate(`90ms ease-out`, style({ opacity: 1 }))])]),
  transition(':leave', [query('.current', [style({ opacity: 1 }), animate(`90ms ease-out`, style({ opacity: 0 }))])]),
  transition('* => *', [
    query('.current', style({ opacity: 0, display: 'block', position: 'absolute' })),
    query('.old', style({ opacity: 1, display: 'block', position: 'absolute' })),
    group([
      query('.old', animate('75ms ease-in', style({ opacity: 0 }))),
      query('.current', animate(`75ms 75ms ease-out`, style({ opacity: 1 }))),
    ]),
  ]),
]);
