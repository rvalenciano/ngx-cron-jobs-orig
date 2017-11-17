import { TestBed, inject } from '@angular/core/testing';

import { PosixService } from './posix.service';

describe('PosixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PosixService]
    });
  });

  it('should be created', inject([PosixService], (service: PosixService) => {
    expect(service).toBeTruthy();
  }));
});
