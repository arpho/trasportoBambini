import { TestBed } from '@angular/core/testing';

import { BusRideServiceService } from './bus-ride-service.service';

describe('BusRideServiceService', () => {
  let service: BusRideServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusRideServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
