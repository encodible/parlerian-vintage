import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessiblePositionsContainerComponent } from './accessible-positions-container.component';

describe('AccessiblePositionsContainerComponent', () => {
  let component: AccessiblePositionsContainerComponent;
  let fixture: ComponentFixture<AccessiblePositionsContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessiblePositionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessiblePositionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
