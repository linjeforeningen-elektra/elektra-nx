import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAdminUserListItemComponent } from './web-admin-user-list-item.component';

describe('WebAdminUserListItemComponent', () => {
  let component: WebAdminUserListItemComponent;
  let fixture: ComponentFixture<WebAdminUserListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebAdminUserListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebAdminUserListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
