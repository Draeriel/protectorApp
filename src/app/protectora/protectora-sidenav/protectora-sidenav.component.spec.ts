import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectoraSidenavComponent } from './protectora-sidenav.component';

describe('ProtectoraSidenavComponent', () => {
  let component: ProtectoraSidenavComponent;
  let fixture: ComponentFixture<ProtectoraSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectoraSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectoraSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
