import { TestBed } from '@angular/core/testing';

import { UtentiServiceService } from './utenti-service.service';

describe('UtentiServiceService', () => {
  let service: UtentiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtentiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
