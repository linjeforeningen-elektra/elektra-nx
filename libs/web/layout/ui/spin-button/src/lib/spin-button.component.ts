import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SPIN_BUTTON_ANIMATION } from './spin-button.animation';

@Component({
  selector: 'forprosjekt-spin-button',
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.scss'],
  animations: [SPIN_BUTTON_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinButtonComponent implements OnChanges {
  @Input() icon?: string;

  _history: [string?, string?] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon']) {
      const v: string | undefined = changes['icon'].currentValue;
      this._history = [this._history.pop(), v];
    }
  }
}
