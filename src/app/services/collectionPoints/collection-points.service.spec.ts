import { TestBed } from '@angular/core/testing';

import { CollectionPointsService } from './collection-points.service';

describe('CollectionPointsService', () => {
  let service: CollectionPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
