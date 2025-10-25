import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsActionPadComponent } from './assignments-action-pad.component';

describe('AssignmentsActionPadComponent', () => {
  let component: AssignmentsActionPadComponent;
  let fixture: ComponentFixture<AssignmentsActionPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsActionPadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsActionPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
