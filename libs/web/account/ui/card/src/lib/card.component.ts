import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CreateCardModel } from '@elektra-nx/shared/models';
import { AccountCardSlice } from '@elektra-nx/web/account/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'elektra-nx-account-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy, OnChanges {
  constructor(private fb: FormBuilder) {}

  readonly formGroup = this.fb.group({
    student_number: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  });

  disableSub?: Subscription;

  @Input() card?: AccountCardSlice | null;
  @Output() deleteCard = new EventEmitter<void>();
  @Output() createCard = new EventEmitter<CreateCardModel>();

  get valid() {
    return this.formGroup.valid;
  }

  get student_number() {
    return this.formGroup.controls['student_number'];
  }

  resetError(): void {
    // this.store.dispatch(cardActions.reset_error());
  }

  removeCard(): void {
    this.deleteCard.emit();
  }

  submit(event: Event) {
    event.preventDefault();
    const body = this.formGroup.value as CreateCardModel;
    this.createCard.emit(body);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card']) {
      if (changes['card'].currentValue) {
        const change = changes['card'].currentValue;
        if (change['student_number']) {
          this.formGroup.controls['student_number'].setValue(change['student_number']);
          this.formGroup.disable();
        }
      } else {
        this.formGroup.enable();
        this.formGroup.controls.student_number.reset();
      }
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.disableSub?.unsubscribe();
  }
}
