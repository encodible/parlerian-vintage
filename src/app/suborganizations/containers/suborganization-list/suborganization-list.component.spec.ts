import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuborganizationListComponent } from './suborganization-list.component';

describe('SuborganizationListComponent', () => {
  let component: SuborganizationListComponent;
  let fixture: ComponentFixture<SuborganizationListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuborganizationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuborganizationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
