import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUserComponent } from './user.component';

describe('UserComponent', () => {
  let component: AccountUserComponent;
  let fixture: ComponentFixture<AccountUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
