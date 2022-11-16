import { Component, Input } from '@angular/core';
import { ExpandAnimation } from './animations/expand-animation';

@Component({
  selector: 'elektra-nx-expandable-section',
  templateUrl: './expandable-section.component.html',
  styleUrls: ['./expandable-section.component.scss'],
  animations: [ExpandAnimation],
})
export class ExpandableSectionComponent {
  @Input() title: string;
  @Input() description: string;

  @Input()
  expanded = false;

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
