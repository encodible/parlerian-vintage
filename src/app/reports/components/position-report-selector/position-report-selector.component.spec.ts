import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionReportSelectorComponent } from './position-report-selector.component';

describe('PositionReportSelectorComponent', () => {
  let component: PositionReportSelectorComponent;
  let fixture: ComponentFixture<PositionReportSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionReportSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionReportSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
