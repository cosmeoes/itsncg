import { Component, OnInit } from '@angular/core';
import { PortalService }  from '../portal.service';
import { DatosCalificacionesFinales } from '../datoscalificaciones';

@Component({
  selector: 'app-calificaciones-finales',
  templateUrl: './calificaciones-finales.component.html',
  styleUrls: ['./calificaciones-finales.component.css']
})
export class CalificacionesFinalesComponent implements OnInit {
  datos: DatosCalificacionesFinales[];
  promedio : string;

  constructor(private portalService: PortalService) { }

  ngOnInit() {
    this.portalService.getCalificacionesFinales().subscribe(res => {
       this.datos = res.datos;
       this.promedio = res.promedio;
     });
  }


}
