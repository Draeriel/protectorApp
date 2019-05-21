import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectoraComponent } from './protectora.component';

describe('ProtectoraComponent', () => {
  let component: ProtectoraComponent;
  let fixture: ComponentFixture<ProtectoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
