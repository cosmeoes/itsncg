import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesFinalesComponent } from './calificaciones-finales.component';

describe('CalificacionesFinalesComponent', () => {
  let component: CalificacionesFinalesComponent;
  let fixture: ComponentFixture<CalificacionesFinalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionesFinalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesFinalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
