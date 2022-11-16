import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinButtonComponent } from './spin-button.component';

describe('SpinButtonComponent', () => {
  let component: SpinButtonComponent;
  let fixture: ComponentFixture<SpinButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
