import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuborganizationPageComponent } from './suborganization-page.component';

describe('SuborganizationPageComponent', () => {
  let component: SuborganizationPageComponent;
  let fixture: ComponentFixture<SuborganizationPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuborganizationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuborganizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
