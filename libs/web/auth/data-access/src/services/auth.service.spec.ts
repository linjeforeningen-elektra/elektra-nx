import { TestBed } from '@angular/core/testing';

import { WebAuthService } from '../services/auth.service';

describe('WebAuthService', () => {
  let service: WebAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
