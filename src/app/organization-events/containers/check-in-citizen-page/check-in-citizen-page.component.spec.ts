import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInCitizenPageComponent } from './check-in-citizen-page.component';

describe('CheckInCitizenPageComponent', () => {
  let component: CheckInCitizenPageComponent;
  let fixture: ComponentFixture<CheckInCitizenPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInCitizenPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInCitizenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
