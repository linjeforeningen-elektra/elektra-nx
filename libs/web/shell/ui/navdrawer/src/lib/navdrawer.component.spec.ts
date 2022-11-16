import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavdrawerComponent } from './navdrawer.component';

describe('NavdrawerComponent', () => {
  let component: NavdrawerComponent;
  let fixture: ComponentFixture<NavdrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavdrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavdrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
