import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerProtectorasComponent } from './volunteer-protectoras.component';

describe('VolunteerProtectorasComponent', () => {
  let component: VolunteerProtectorasComponent;
  let fixture: ComponentFixture<VolunteerProtectorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerProtectorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerProtectorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
