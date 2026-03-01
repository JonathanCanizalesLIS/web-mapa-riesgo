export interface Unidad {
  idUnidad: string;
  unidad1: string;
  latitud: number;
  longitud: number;
  idOperador: number;
  idSistemaOrigen: number;
  idEmpresa: number;
}


// src/app/core/domain/eventos/entities/evento.entity.ts

export interface EventoEntity {
  idEvento: number;
  idTipoEvento: number;
  latitud: number;
  longitud: number;
  evidencia: string;
  fecha: string; // o Date si vas a transformarlo
  idSistemaOrigen: number;
  idEmpresa: number;
  color: string;
}

export interface EventosViajeData {
  accidentes: EventoEntity[] | null;
  bloqueos: EventoEntity[] | null;
  robos: EventoEntity[] | null;
  otros: EventoEntity[] | null;
}

export interface EventosViajeResponse {
  id: number;
  status: number;
  message: string;
  hasError: boolean;
  data: EventosViajeData;
}
