import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FADE_TEXT_ANIMATION } from './fade-text.animation';

@Component({
  selector: 'forprosjekt-fade-text',
  templateUrl: './fade-text.component.html',
  styleUrls: ['./fade-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FADE_TEXT_ANIMATION],
})
export class FadeTextComponent implements OnChanges {
  @Input() text?: string | null;

  _history: [string?, string?] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['text']) {
      const v: string | undefined = changes['text'].currentValue;
      this._history = [this._history.pop(), v];
    }
  }
}
