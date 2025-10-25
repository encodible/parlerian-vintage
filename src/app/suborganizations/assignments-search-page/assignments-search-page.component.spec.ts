import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsSearchPageComponent } from './assignments-search-page.component';

describe('AssignmentsSearchPageComponent', () => {
  let component: AssignmentsSearchPageComponent;
  let fixture: ComponentFixture<AssignmentsSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
