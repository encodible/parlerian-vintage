import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSimpleListComponent } from './assignment-simple-list.component';

describe('AssignmentSimpleListComponent', () => {
  let component: AssignmentSimpleListComponent;
  let fixture: ComponentFixture<AssignmentSimpleListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentSimpleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentSimpleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
