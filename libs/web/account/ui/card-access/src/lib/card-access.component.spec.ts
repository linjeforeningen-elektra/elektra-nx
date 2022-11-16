import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAccessComponent } from './card-access.component';

describe('CardAccessComponent', () => {
  let component: CardAccessComponent;
  let fixture: ComponentFixture<CardAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
