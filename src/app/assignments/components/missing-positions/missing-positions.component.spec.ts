import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingPositionsComponent } from './missing-positions.component';

describe('MissingPositionsComponent', () => {
  let component: MissingPositionsComponent;
  let fixture: ComponentFixture<MissingPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
