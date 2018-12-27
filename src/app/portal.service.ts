import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DatosInicio } from './datosinicio';
import { DatosCalificacionesFinales } from './datoscalificaciones';
import { DatosCalificacionesParciales } from './datoscalificaciones';
import { Materia } from './datoscalificaciones';
import { CalificacionesParciales } from './datoscalificaciones';
import * as $ from "jquery";

const httpOptions = {
  headers: new HttpHeaders({
    "Accept": 	"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Content-Type": 'application/x-www-form-urlencoded'
    // "Accept-Encoding":	"gzip, deflate",
    // "Accept-Language":  "en-US,en;q=0.5",
    // "Connection": "keep-alive",
    // "Content-Length"	: "707",
    // "Content-Type"	: "application/x-www-form-urlencoded",
    // "Host"	: "148.223.124.178",
    // "Upgrade-Insecure-Requests"	: "1",
    // "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0",
  }),
  withCredentials: true,
  responseType: 'text' as 'text'
};

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  private baseURL: string = "/api";

  private viewstate: string;
  private eventvalidation : string;
  private viewstategenerator: string;
  private eventTarget: string;
  private eventArgument: string;

  constructor(private httpClient : HttpClient) { }

  init() {
    this.httpClient.get(this.baseURL+"/Login.aspx",httpOptions).subscribe(data => {
      this.viewstate = $(data).find("#__VIEWSTATE").val();
      this.eventvalidation = $(data).find("#__EVENTVALIDATION").val();
      this.viewstategenerator = $(data).find("#__VIEWSTATEGENERATOR").val();
      this.eventTarget = $(data).find("#__EVENTTARGET").val();
      this.eventArgument = $(data).find("#__EVENTARGUMENT").val();
    });
  }

  login(noControl:string, pass:string) {
    let body = `ctl00%24MainContent%24Usuario=${encodeURIComponent(noControl)}&ctl00%24MainContent%24Pass=${encodeURIComponent(pass)}&__VIEWSTATE=${encodeURIComponent(this.viewstate)}&__EVENTVALIDATION=${encodeURIComponent(this.eventvalidation)}&__VIEWSTATEGENERATOR=${encodeURIComponent(this.viewstategenerator)}&ctl00%24MainContent%24Button1=Entrar&__EVENTARGUMENT=${encodeURIComponent(this.eventArgument)}&$__EVENTTARGET=${encodeURIComponent(this.eventTarget)}`;
    return this.httpClient.post(this.baseURL+"/Login.aspx",body, httpOptions)
    .pipe(
      map(data => {
        if(data.includes("Su usuario o la contraseña son incorrectos")){
          return data = "error";
        }
        return data;
      }));
  }
  getInicio(){
    return this.httpClient.get(this.baseURL+"/Default.aspx", httpOptions).pipe(map(res => {
      let obj = $(res);
      let datos : DatosInicio = new DatosInicio();
      datos.promedio = obj.find("#MainContent_PROMEDIO").html();
      datos.porcentajeAvance = obj.find("#MainContent_AVANCE").html();
      datos.creditosC = obj.find("#MainContent_CREDITOS").html();
      datos.matricula = obj.find("#MainContent_Matricula").html();
      datos.status = obj.find("#MainContent_Status").html();
      datos.nombre = obj.find("#MainContent_Nombre").html();
      datos.semestre = obj.find("#MainContent_Semestre").html();
      datos.carrera = obj.find("#MainContent_Carrera").html();
      datos.sexo = obj.find("#MainContent_Sexo").html();
      datos.fotoUrl = obj.find("#Img1").attr('src');
      datos.situacion = obj.find("#MainContent_lblSituacion").html();
      datos.curp = obj.find("#MainContent_Curp").html();
      datos.turno = obj.find("#MainContent_Turno").html();
      return datos;
    }));
  }
  getDatos(){
    return this.httpClient.get(this.baseURL+"/Default.aspx", httpOptions).pipe(map( res => {
      if($(res).find('#US').html()) {
        let nomNo = $(res).find('#US').html().split(/ (.+)/);
        return {noControl: nomNo[0],nombre: nomNo[1]};
      } else {
        return {error: "No hay sesion iniciada"};
      }

    }));
  }

  getCalificacionesFinales(){
    return this.httpClient.get(this.baseURL+"/final.aspx", httpOptions).pipe(map(res => {
      let datos:DatosCalificacionesFinales[] = new Array();
      let tabla = $(res).find("#MainContent_GridView1 > tbody > tr");
      for(let i=1; i < tabla.length; i++) {
        let dato:DatosCalificacionesFinales = new DatosCalificacionesFinales();
        let tds = $(tabla[i]).children();
        dato.nombre = $(tds[2]).html();
        dato.calificaciones = $(tds[3]).html();
        dato.oportunidad = $(tds[4]).html();
        datos.push(dato);
      }
      return {
        datos: datos,
        promedio: $(res).find("#MainContent_lblNo").html(),
      }
    }));
  }

  getDatosCalificacionesParciales() {
    return this.httpClient.get(this.baseURL+"/parcial.aspx", httpOptions).pipe(map(res => {
      this.viewstate = $(res).find("#__VIEWSTATE").val();
      this.eventvalidation = $(res).find("#__EVENTVALIDATION").val();
      this.viewstategenerator = $(res).find("#__VIEWSTATEGENERATOR").val();
      this.eventTarget = $(res).find("#__EVENTTARGET").val();
      this.eventArgument = $(res).find("#__EVENTARGUMENT").val();

      let datos: DatosCalificacionesParciales = new DatosCalificacionesParciales();
      datos.idAlumno = $(res).find("#MainContent_id_alu").val();
      datos.idCic = $(res).find("#MainContent_id_cic").val();
      datos.idGPO = $(res).find("#MainContent_ID_GPO").val();
      let materias = $(res).find("#MainContent_Mate").children();
      let datosMaterias : Materia[] = new Array();
      for(let i = 1; i < materias.length; i++) {
        let datosMateria : Materia = new Materia();
        datosMateria.id = $(materias[i]).val();
        datosMateria.nombre = $(materias[i]).html();
        datosMaterias.push(datosMateria);
      }
      datos.materias = datosMaterias;
      return datos;
    }));
  }

  getCalificacionesMateria(idMateria : string, datos : DatosCalificacionesParciales) {
    let body = `ctl00%24MainContent%24Mate=${idMateria}&ctl00%24MainContent%24id_alu=${datos.idAlumno}&ctl00%24MainContent%24id_cic=${datos.idCic}&ctl00%24MainContent%24ID_GPO=${datos.idGPO}&__EVENTTARGET=ctl00%24MainContent%24Mate&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=${encodeURIComponent(this.viewstate)}&__VIEWSTATEGENERATOR=${encodeURIComponent(this.viewstategenerator)}&__EVENTVALIDATION=${encodeURIComponent(this.eventvalidation)}&__ASYNCPOST=true&ctl00%24MainContent%24ScriptManager1=ctl00%24MainContent%24UpdatePanel1%7Cctl00%24MainContent%24Mate`;
    return this.httpClient.post(this.baseURL+"/parcial.aspx", body, httpOptions).pipe(map(res => {
      let tabla = $(res.split("|")[7]).find("#MainContent_GridView1 > tbody > tr");
      let arregloCalificaciones : CalificacionesParciales[] = new Array();
      for(let i=1; i < tabla.length; i++) {
        let calificaciones : CalificacionesParciales = new CalificacionesParciales();
        let tds = $(tabla[i]).children();
        calificaciones.calificacion = $(tds[3]).html();
        calificaciones.unidad = $(tds[4]).html();
        calificaciones.oportunidad = $(tds[5]).html();
        arregloCalificaciones.push(calificaciones);
      }
      return arregloCalificaciones;
    }));
  }
}
