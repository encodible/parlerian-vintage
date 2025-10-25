import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuborganizationDetailPageComponent } from './suborganization-detail-page.component';

describe('SuborganizationDetailPageComponent', () => {
  let component: SuborganizationDetailPageComponent;
  let fixture: ComponentFixture<SuborganizationDetailPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuborganizationDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuborganizationDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
