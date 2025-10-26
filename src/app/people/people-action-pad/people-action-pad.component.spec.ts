import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleActionPadComponent } from './people-action-pad.component';

describe('PeopleActionPadComponent', () => {
  let component: PeopleActionPadComponent;
  let fixture: ComponentFixture<PeopleActionPadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleActionPadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleActionPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
