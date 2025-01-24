import { TestBed } from '@angular/core/testing';

import { OnDemandCacheService } from './on-demand-cache.service';

describe('OnDemandCacheService', () => {
  let service: OnDemandCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnDemandCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
