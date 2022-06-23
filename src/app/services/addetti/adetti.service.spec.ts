import { TestBed } from '@angular/core/testing';

import { AddettiService } from './adetti.service';

describe('AdettiService', () => {
  let service: AddettiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddettiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
