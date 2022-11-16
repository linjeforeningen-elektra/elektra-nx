import { trigger, query, animate, style, group, transition } from '@angular/animations';
import { easings } from '@elektra-nx/web/shared/utils';

export const FadeTextTransition = trigger('FadeText', [
  transition(':enter', []),
  transition('* => *', [
    query('.new', style({ opacity: 0, display: 'block' })),
    query('.old', style({ opacity: 1, display: 'block' })),
    group([
      query('.old', animate(`90ms 0ms ${easings.LEAVING}`, style({ opacity: 0 }))),
      query('.new', animate(`210ms 90ms ${easings.ENTERING}`, style({ opacity: 1 }))),
    ]),
  ]),
]);
