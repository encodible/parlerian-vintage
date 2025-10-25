import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceListContainerComponent } from './attendance-list-container.component';

describe('AttendanceListContainerComponent', () => {
  let component: AttendanceListContainerComponent;
  let fixture: ComponentFixture<AttendanceListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
