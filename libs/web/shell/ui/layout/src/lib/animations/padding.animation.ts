import { state, style, trigger } from '@angular/animations';

export const PaddingAnimation = trigger('Padding', [
  state('true', style({ paddingTop: 56 })),
  state('false', style({ paddingTop: 0 })),
]);
