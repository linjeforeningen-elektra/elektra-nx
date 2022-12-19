import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNavdrawerComponent } from './layout-navdrawer.component';

describe('LayoutNavdrawerComponent', () => {
  let component: LayoutNavdrawerComponent;
  let fixture: ComponentFixture<LayoutNavdrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutNavdrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutNavdrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
