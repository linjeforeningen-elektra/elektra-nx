import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FadeTextComponent } from './fade-text.component';

describe('FadeTextComponent', () => {
  let component: FadeTextComponent;
  let fixture: ComponentFixture<FadeTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [FadeTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FadeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
