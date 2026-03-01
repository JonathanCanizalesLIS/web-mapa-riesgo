import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EventosViajeData, Unidad } from '../models/unidad.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

   private http = inject(HttpClient);
  private baseUrl = "https://localhost:7245/api/";

  getUnidades(): Observable<Unidad[]> {
    return this.http
      .get<ApiResponse<Unidad[]>>(`${this.baseUrl}Unidad/GetAll`)
      .pipe(
        map(response => response.data)
      );
  }

  getEventosViaje(): Observable<EventosViajeData> {
    return this.http
      .get<ApiResponse<EventosViajeData>>(`${this.baseUrl}Unidad/ObtenerEventos`)
      .pipe(
        map(response => response.data)
      );
  }

}
