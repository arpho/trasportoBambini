import { TestBed } from '@angular/core/testing';

import { AdettiService } from './adetti.service';

describe('AdettiService', () => {
  let service: AdettiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdettiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
