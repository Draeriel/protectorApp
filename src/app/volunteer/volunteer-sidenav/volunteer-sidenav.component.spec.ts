import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerSidenavComponent } from './volunteer-sidenav.component';

describe('VolunteerSidenavComponent', () => {
  let component: VolunteerSidenavComponent;
  let fixture: ComponentFixture<VolunteerSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
