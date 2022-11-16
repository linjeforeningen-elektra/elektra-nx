import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeTextComponent } from './fade-text.component';

describe('FadeTextComponent', () => {
  let component: FadeTextComponent;
  let fixture: ComponentFixture<FadeTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FadeTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FadeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
