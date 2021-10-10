import { TestBed } from '@angular/core/testing';

import { StormDataService } from './storm-data.service';

describe('StormDataService', () => {
  let service: StormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
