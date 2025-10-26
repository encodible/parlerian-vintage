import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingPositionsContainerComponent } from './missing-positions-container.component';

describe('MissingPositionsContainerComponent', () => {
  let component: MissingPositionsContainerComponent;
  let fixture: ComponentFixture<MissingPositionsContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingPositionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingPositionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
