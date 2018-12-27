import { Component, OnInit } from '@angular/core';
import { DatosCalificacionesParciales } from '../datoscalificaciones';
import { PortalService } from '../portal.service';
import { CalificacionesParciales } from '../datoscalificaciones';

@Component({
  selector: 'app-calificaciones-parciales',
  templateUrl: './calificaciones-parciales.component.html',
  styleUrls: ['./calificaciones-parciales.component.css']
})
export class CalificacionesParcialesComponent implements OnInit {
  datos : DatosCalificacionesParciales;
  calificaciones : CalificacionesParciales[];
  materiaSeleccionada: string;

  constructor(private portalService: PortalService) { }

  ngOnInit() {
    this.portalService.getDatosCalificacionesParciales().subscribe(datos => this.datos = datos);
  }

  getCalificacionMateria(val) {
    this.portalService.getCalificacionesMateria(val, this.datos).subscribe(cal => this.calificaciones = cal);
    this.calificaciones = undefined;
  }

}
