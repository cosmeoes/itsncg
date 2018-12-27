import { Component, OnInit } from '@angular/core';
import { PortalService } from '../portal.service';
import { Datos } from '../datos';
import * as $ from "jquery";
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  usuario:Datos = new Datos();

  constructor(private portalService:PortalService) { }

  ngOnInit() {
    this.portalService.getDatos().subscribe(res => {
        if(!res.error) {
          this.usuario.nombre= this.toUpper(res.nombre);
          $(".main").show();
          $(".jumbotron").hide();
        } else {
          window.location.href = "login";
        }
    });
  }

  toUpper(str) {
    return str
    .toLowerCase()
    .split(' ')
    .map(function(word) {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
  }

}
