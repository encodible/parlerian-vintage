import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenateDistrictDetailComponent } from './senate-district-detail.component';

describe('SenateDistrictDetailComponent', () => {
  let component: SenateDistrictDetailComponent;
  let fixture: ComponentFixture<SenateDistrictDetailComponent>;

  beforeEach(async(() => {
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
