import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenateDistrictDetailComponent } from './senate-district-detail.component';

describe('SenateDistrictDetailComponent', () => {
  let component: SenateDistrictDetailComponent;
  let fixture: ComponentFixture<SenateDistrictDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SenateDistrictDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenateDistrictDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
