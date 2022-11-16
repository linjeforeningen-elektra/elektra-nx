import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardAccessStatus } from '@elektra-nx/shared/models';

@Component({
  selector: 'elektra-nx-account-card-access',
  templateUrl: './card-access.component.html',
  styleUrls: ['./card-access.component.scss'],
})
export class CardAccessComponent {
  @Input() status?: CardAccessStatus | null;
  @Output() renew = new EventEmitter<void>();

  submit(event: Event) {
    event.preventDefault();
    this.renew.emit();
  }
}
