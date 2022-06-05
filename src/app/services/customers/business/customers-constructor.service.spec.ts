import { TestBed } from '@angular/core/testing';

import { CustomersFactoryService } from './customers-constructor.service';

describe('CustomersConstructorService', () => {
  let service: CustomersFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
