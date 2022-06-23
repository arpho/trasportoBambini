import { TestBed } from '@angular/core/testing';

import { ClerksService } from './adetti.service';

describe('AdettiService', () => {
  let service: ClerksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClerksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
