import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleActionPadNavComponent } from './people-action-pad-nav.component';

describe('PeopleActionPadNavComponent', () => {
  let component: PeopleActionPadNavComponent;
  let fixture: ComponentFixture<PeopleActionPadNavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleActionPadNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleActionPadNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
