import { TestBed } from '@angular/core/testing';

import { AppCoreService } from './app-core.service';

describe('AppCoreService', () => {
  let service: AppCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
