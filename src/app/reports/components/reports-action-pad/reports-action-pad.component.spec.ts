import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsActionPadComponent } from './reports-action-pad.component';

describe('ReportsActionPadComponent', () => {
  let component: ReportsActionPadComponent;
  let fixture: ComponentFixture<ReportsActionPadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsActionPadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsActionPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
