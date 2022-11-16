import { animate, query, style, transition, trigger, group } from '@angular/animations';
import { easings } from '@elektra-nx/web/shared/utils';

export const SpinTransition = trigger('SpinTransition', [
  transition(':enter', []),
  transition(':leave', [
    query('.new', [style({ opacity: 1 }), animate(`90ms ${easings.LEAVING}`, style({ opacity: 0 }))]),
  ]),
  transition('* => *', [
    query('.new', style({ opacity: 0, display: 'block', transform: 'rotate(180deg)' })),
    query('.old', style({ opacity: 1, display: 'block', transform: 'rotate(0deg)' })),
    group([
      query('.old', animate(`75ms 0ms ${easings.LEAVING}`, style({ opacity: 0, transform: 'rotate(180deg)' }))),
      query('.new', animate(`75ms 75ms ${easings.ENTERING}`, style({ opacity: 1, transform: 'rotate(360deg)' }))),
    ]),
  ]),
]);
