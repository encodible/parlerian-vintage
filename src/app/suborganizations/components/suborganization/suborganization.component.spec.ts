import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuborganizationComponent } from './suborganization.component';

describe('SuborganizationComponent', () => {
  let component: SuborganizationComponent;
  let fixture: ComponentFixture<SuborganizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuborganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuborganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
