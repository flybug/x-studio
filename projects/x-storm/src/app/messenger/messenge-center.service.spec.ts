import { TestBed } from '@angular/core/testing';

import { MessengeCenterService } from './messenge-center.service';

describe('MessengeCenterService', () => {
  let service: MessengeCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengeCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
