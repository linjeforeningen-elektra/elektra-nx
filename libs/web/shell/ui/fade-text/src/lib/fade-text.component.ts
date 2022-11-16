import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FadeTextTransition } from './animations/fade-text-transition.animation';

@Component({
  selector: 'elektra-nx-fade-text',
  templateUrl: './fade-text.component.html',
  styleUrls: ['./fade-text.component.scss'],
  animations: [FadeTextTransition],
})
export class FadeTextComponent implements OnChanges {
  @Input()
  public value?: string;

  @Input()
  public disable?: null | boolean = true;

  values: [string | undefined, string | undefined] = [undefined, undefined];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.values = [this.values.pop(), changes['value'].currentValue];
    }
  }
}
