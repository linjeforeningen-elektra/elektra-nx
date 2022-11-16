import { Component, Input } from '@angular/core';

@Component({
  selector: 'elektra-nx-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() diameter = '128';
}
