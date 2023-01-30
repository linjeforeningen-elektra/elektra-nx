import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAdminFeatureUserListComponent } from './web-admin-feature-user-list.component';

describe('WebAdminFeatureUserListComponent', () => {
  let component: WebAdminFeatureUserListComponent;
  let fixture: ComponentFixture<WebAdminFeatureUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebAdminFeatureUserListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebAdminFeatureUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
