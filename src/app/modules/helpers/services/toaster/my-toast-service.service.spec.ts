import { TestBed } from '@angular/core/testing';

import { MyToastServiceService } from './my-toast-service.service';

describe('MyToastServiceService', () => {
  let service: MyToastServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyToastServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
