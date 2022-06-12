import { TestBed } from '@angular/core/testing';

import { StudentLogService } from './student-log.service';

describe('StudentLogService', () => {
  let service: StudentLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
