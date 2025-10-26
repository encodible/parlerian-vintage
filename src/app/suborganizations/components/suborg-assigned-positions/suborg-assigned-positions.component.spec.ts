import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuborgAssignedPositionsComponent } from './suborg-assigned-positions.component';

describe('SuborgAssignedPositionsComponent', () => {
  let component: SuborgAssignedPositionsComponent;
  let fixture: ComponentFixture<SuborgAssignedPositionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuborgAssignedPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuborgAssignedPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
