import { Component, OnInit } from '@angular/core';
import { PortalService } from '../portal.service';
import { DatosInicio } from '../datosinicio';

@Component({
  selector: 'app-portal-inicio',
  templateUrl: './portal-inicio.component.html',
  styleUrls: ['./portal-inicio.component.css']
})
export class PortalInicioComponent implements OnInit {
  datosInicio : DatosInicio;

  constructor(private portalService: PortalService) { }

  ngOnInit() {
    this.portalService.getInicio().subscribe(res => this.datosInicio = res);
  }

}
