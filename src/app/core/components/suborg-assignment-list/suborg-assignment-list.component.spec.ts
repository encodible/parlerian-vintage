import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuborgAssignmentListComponent } from './suborg-assignment-list.component';

describe('SuborgAssignmentListComponent', () => {
  let component: SuborgAssignmentListComponent;
  let fixture: ComponentFixture<SuborgAssignmentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuborgAssignmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuborgAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
