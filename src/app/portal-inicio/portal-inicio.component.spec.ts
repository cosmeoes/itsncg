import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalInicioComponent } from './portal-inicio.component';

describe('PortalInicioComponent', () => {
  let component: PortalInicioComponent;
  let fixture: ComponentFixture<PortalInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
