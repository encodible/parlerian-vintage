import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutViciComponent } from './about-vici.component';

describe('AboutViciComponent', () => {
  let component: AboutViciComponent;
  let fixture: ComponentFixture<AboutViciComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutViciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutViciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
