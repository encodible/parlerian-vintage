import { TestBed, inject } from '@angular/core/testing';

import { OrganizationEventsService } from './organization-events.service';

describe('OrganizationEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationEventsService]
    });
  });

  it('should be created', inject([OrganizationEventsService], (service: OrganizationEventsService) => {
    expect(service).toBeTruthy();
  }));
});
