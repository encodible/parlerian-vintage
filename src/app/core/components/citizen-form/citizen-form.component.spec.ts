import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFormComponent } from './citizen-form.component';

describe('CitizenFormComponent', () => {
  let component: CitizenFormComponent;
  let fixture: ComponentFixture<CitizenFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizenFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
