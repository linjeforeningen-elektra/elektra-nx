import { TestBed } from '@angular/core/testing';

import { NavdrawerService } from './navdrawer.service';

describe('NavdrawerService', () => {
  let service: NavdrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavdrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
