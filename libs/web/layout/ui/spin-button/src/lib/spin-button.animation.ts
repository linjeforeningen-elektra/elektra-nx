import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const SPIN_BUTTON_ANIMATION = trigger('SpinButton', [
  transition(':enter', [query('.current', [style({ opacity: 0 }), animate(`90ms ease-out`, style({ opacity: 1 }))])]),
  transition(':leave', [query('.current', [style({ opacity: 1 }), animate(`90ms ease-out`, style({ opacity: 0 }))])]),
  transition('* => *', [
    query('.current', style({ opacity: 0, display: 'block', transform: 'rotate(180deg)' })),
    query('.old', style({ opacity: 1, display: 'block', transform: 'rotate(0deg)' })),
    group([
      query('.old', animate('75ms ease-in', style({ opacity: 0, transform: 'rotate(180deg)' }))),
      query('.current', animate(`75ms 75ms ease-out`, style({ opacity: 1, transform: 'rotate(360deg)' }))),
    ]),
  ]),
]);
