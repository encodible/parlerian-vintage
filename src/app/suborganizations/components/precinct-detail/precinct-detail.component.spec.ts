import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecinctDetailComponent } from './precinct-detail.component';

describe('PrecinctDetailComponent', () => {
  let component: PrecinctDetailComponent;
  let fixture: ComponentFixture<PrecinctDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecinctDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecinctDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
