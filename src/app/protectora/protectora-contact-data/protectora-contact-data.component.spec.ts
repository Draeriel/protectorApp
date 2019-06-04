import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectoraContactDataComponent } from './protectora-contact-data.component';

describe('ProtectoraContactDataComponent', () => {
  let component: ProtectoraContactDataComponent;
  let fixture: ComponentFixture<ProtectoraContactDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectoraContactDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectoraContactDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
