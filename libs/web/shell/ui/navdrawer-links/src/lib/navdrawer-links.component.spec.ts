import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavdrawerLinksComponent } from './navdrawer-links.component';

describe('NavdrawerLinksComponent', () => {
  let component: NavdrawerLinksComponent;
  let fixture: ComponentFixture<NavdrawerLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavdrawerLinksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavdrawerLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
