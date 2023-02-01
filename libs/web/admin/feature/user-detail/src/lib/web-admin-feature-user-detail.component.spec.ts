import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAdminFeatureUserDetailComponent } from './web-admin-feature-user-detail.component';

describe('WebAdminFeatureUserDetailComponent', () => {
  let component: WebAdminFeatureUserDetailComponent;
  let fixture: ComponentFixture<WebAdminFeatureUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebAdminFeatureUserDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebAdminFeatureUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
