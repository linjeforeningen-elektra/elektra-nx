import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SpinTransition } from './animations/spin-transition.animation';

@Component({
  selector: 'elektra-nx-spin-button',
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.scss'],
  animations: [SpinTransition],
})
export class SpinButtonComponent implements OnChanges {
  @Input()
  value?: string;

  values: [string?, string?] = [undefined, undefined];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.values = [this.values.pop(), this.value];
    }
  }
}
