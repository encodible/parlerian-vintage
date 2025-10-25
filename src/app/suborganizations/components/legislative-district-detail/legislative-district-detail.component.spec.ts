import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegislativeDistrictDetailComponent } from './legislative-district-detail.component';

describe('LegislativeDistrictDetailComponent', () => {
  let component: LegislativeDistrictDetailComponent;
  let fixture: ComponentFixture<LegislativeDistrictDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LegislativeDistrictDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegislativeDistrictDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
