import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationEventsPageComponent } from './organization-events-page.component';

describe('OrganizationEventsPageComponent', () => {
  let component: OrganizationEventsPageComponent;
  let fixture: ComponentFixture<OrganizationEventsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationEventsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
