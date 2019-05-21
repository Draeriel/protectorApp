import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectoraPublicProfileComponent } from './protectora-public-profile.component';

describe('ProtectoraPublicProfileComponent', () => {
  let component: ProtectoraPublicProfileComponent;
  let fixture: ComponentFixture<ProtectoraPublicProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectoraPublicProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectoraPublicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
