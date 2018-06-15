import { TestBed, inject } from '@angular/core/testing';

import { LocastorageService } from './locastorage.service';

describe('LocastorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocastorageService]
    });
  });

  it('should be created', inject([LocastorageService], (service: LocastorageService) => {
    expect(service).toBeTruthy();
  }));
});
