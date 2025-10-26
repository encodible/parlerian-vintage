import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenChangePageComponent } from './citizen-change-page.component';

describe('PeopleAddCitizenComponentComponent', () => {
  let component: CitizenChangePageComponent;
  let fixture: ComponentFixture<CitizenChangePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizenChangePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenChangePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
