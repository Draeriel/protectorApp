import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableScheduleComponent } from './available-schedule.component';

describe('AvailableScheduleComponent', () => {
  let component: AvailableScheduleComponent;
  let fixture: ComponentFixture<AvailableScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
