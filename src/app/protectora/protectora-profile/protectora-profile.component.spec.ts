import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectoraProfileComponent } from './protectora-profile.component';

describe('ProtectoraProfileComponent', () => {
  let component: ProtectoraProfileComponent;
  let fixture: ComponentFixture<ProtectoraProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectoraProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectoraProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
