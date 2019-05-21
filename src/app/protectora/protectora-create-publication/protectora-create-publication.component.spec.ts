import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectoraCreatePublicationComponent } from './protectora-create-publication.component';

describe('ProtectoraCreatePublicationComponent', () => {
  let component: ProtectoraCreatePublicationComponent;
  let fixture: ComponentFixture<ProtectoraCreatePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectoraCreatePublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectoraCreatePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
