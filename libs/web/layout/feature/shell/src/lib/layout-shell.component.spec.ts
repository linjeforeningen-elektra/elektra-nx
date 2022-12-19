import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutShellComponent } from './layout-shell.component';

describe('LayoutShellComponent', () => {
  let component: LayoutShellComponent;
  let fixture: ComponentFixture<LayoutShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
