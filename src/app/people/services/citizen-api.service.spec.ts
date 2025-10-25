import { TestBed, inject } from '@angular/core/testing';

import { CitizenApi } from './citizen-api.service';

describe('CitizenServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitizenApi]
    });
  });

  it('should be created', inject([CitizenApi], (service: CitizenApi) => {
    expect(service).toBeTruthy();
  }));
});
