import { TestBed, inject } from '@angular/core/testing';

import { SuborganizationService } from './suborganization.service';

describe('SuborganizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuborganizationService]
    });
  });

  it('should be created', inject([SuborganizationService], (service: SuborganizationService) => {
    expect(service).toBeTruthy();
  }));
});
