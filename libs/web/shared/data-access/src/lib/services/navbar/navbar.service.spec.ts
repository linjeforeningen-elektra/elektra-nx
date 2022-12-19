import { TestBed } from '@angular/core/testing';

import { WebNavbarService } from './navbar.service';

describe('WebNavbarService', () => {
  let service: WebNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebNavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
