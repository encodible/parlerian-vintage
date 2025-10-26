import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenSelectionListComponent } from './citizen-selection-list.component';

describe('CitizenSelectionListComponent', () => {
  let component: CitizenSelectionListComponent;
  let fixture: ComponentFixture<CitizenSelectionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizenSelectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
