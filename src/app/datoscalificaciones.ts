
export class DatosCalificacionesFinales {
    nombre: string;
    calificaciones: string;
    oportunidad: string;
}

export class DatosCalificacionesParciales {
  idAlumno : string;
  idCic : string;
  idGPO : string;
  materias: Materia[];

}

export class Materia {
  id : string;
  nombre : string;
}

export class CalificacionesParciales {
  calificacion: string;
  unidad: string;
  oportunidad: string;
}
