import { trigger, transition, state, style, animate } from '@angular/animations';
import { easings, timings } from '@elektra-nx/web/shared/utils';

export const ExpandAnimation = trigger('expand', [
  state('true', style({ height: '*' })),
  state('false', style({ height: 0 })),
  transition(':enter', []),
  transition('false => true', animate(`${timings.MEDIUM_ENTER} ${easings.ENTERING}`)),
  transition('true => false', animate(`${timings.MEDIUM_LEAVE} ${easings.LEAVING}`)),
]);
