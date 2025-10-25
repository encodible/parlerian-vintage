import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentUpdateFormComponent } from './assignment-update-form.component';

describe('AssignmentUpdateFormComponent', () => {
  let component: AssignmentUpdateFormComponent;
  let fixture: ComponentFixture<AssignmentUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
