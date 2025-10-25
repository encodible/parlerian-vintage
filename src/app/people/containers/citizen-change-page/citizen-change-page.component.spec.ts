import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenChangePageComponent } from './citizen-change-page.component';

describe('PeopleAddCitizenComponentComponent', () => {
  let component: CitizenChangePageComponent;
  let fixture: ComponentFixture<CitizenChangePageComponent>;

  beforeEach(async(() => {
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
