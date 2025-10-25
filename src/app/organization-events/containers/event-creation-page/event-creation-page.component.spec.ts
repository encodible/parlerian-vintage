import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreationPageComponent } from './event-creation-page.component';

describe('EventCreationPageComponent', () => {
  let component: EventCreationPageComponent;
  let fixture: ComponentFixture<EventCreationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCreationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
