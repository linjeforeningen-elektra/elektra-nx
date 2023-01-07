import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAuthFeaturePasswordResetComponent } from './web-auth-feature-password-reset.component';

describe('WebAuthFeaturePasswordResetComponent', () => {
  let component: WebAuthFeaturePasswordResetComponent;
  let fixture: ComponentFixture<WebAuthFeaturePasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebAuthFeaturePasswordResetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebAuthFeaturePasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
