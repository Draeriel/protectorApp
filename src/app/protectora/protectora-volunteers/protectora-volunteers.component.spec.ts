import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectoraVolunteersComponent } from './protectora-volunteers.component';

describe('ProtectoraVolunteersComponent', () => {
  let component: ProtectoraVolunteersComponent;
  let fixture: ComponentFixture<ProtectoraVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectoraVolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectoraVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
