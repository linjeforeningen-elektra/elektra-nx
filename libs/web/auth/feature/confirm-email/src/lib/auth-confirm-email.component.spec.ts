import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthConfirmEmailComponent } from './auth-confirm-email.component';

describe('AuthConfirmEmailComponent', () => {
  let component: AuthConfirmEmailComponent;
  let fixture: ComponentFixture<AuthConfirmEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthConfirmEmailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
