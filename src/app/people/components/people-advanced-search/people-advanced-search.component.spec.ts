import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleAdvancedSearchComponent } from './people-advanced-search.component';

describe('PeopleAdvancedSearchComponentComponent', () => {
  let component: PeopleAdvancedSearchComponent;
  let fixture: ComponentFixture<PeopleAdvancedSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleAdvancedSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
