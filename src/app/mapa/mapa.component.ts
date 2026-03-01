import { AfterViewInit, Component, inject } from '@angular/core';
import { MapaService } from '../core/services/mapa.service';
import * as L from 'leaflet';
import 'leaflet.heat';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mapa',
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
})
export class MapaComponent implements AfterViewInit {
  private mapaService = inject(MapaService);
  private map: L.Map | null = null;

  ngAfterViewInit(): void {
    this.cargarMapa();
  }

  evidenciaSeleccionada: string | null = null;

  cargarMapa() {

    forkJoin({
      unidades: this.mapaService.getUnidades(),
      eventos: this.mapaService.getEventosViaje()
    }).subscribe({
      next: ({ unidades, eventos }) => {

        this.map = L.map('map').setView([19.5, -99.1], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
          this.map
        );

        this.agregarCapaCalorUnidades(unidades);

        this.agregarMarcadoresEventos(eventos);
      },
      error: (error) => {
        console.error('Error al cargar datos del mapa:', error);
      }
    });
  }

  private agregarCapaCalorUnidades(unidades: any[]) {
    const heatPoints: [number, number, number][] = [];

    unidades.forEach((u) => {
      if (u.latitud && u.longitud) {
        heatPoints.push([u.latitud, u.longitud, 5]);
      }
    });

    (L as any)
      .heatLayer(heatPoints, {
        radius: 34,
        blur: 20,
        maxZoom: 12,
        max: 1.0,
        gradient: {
          0.0: 'blue',
          0.3: 'cyan',
          0.5: 'lime',
          0.7: 'yellow',
          0.9: 'orange',
          1.0: 'red',
        },
      })
      .addTo(this.map!);
  }

  private agregarMarcadoresEventos(eventos: any) {

    const iconoAccidente = this.crearIconoPersonalizado('#e53935');
    const iconoBloqueo = this.crearIconoPersonalizado('#F26522');
    const iconoRobo = this.crearIconoPersonalizado('#9C27B0');
    const iconoOtro = this.crearIconoPersonalizado('#757575');

    if (eventos.accidentes) {
      eventos.accidentes.forEach((accidente: any) => {
        this.agregarMarcador(
          accidente,
          iconoAccidente,
          '🚨 Accidente',
          '#e53935'
        );
      });
    }

    if (eventos.bloqueos) {
      eventos.bloqueos.forEach((bloqueo: any) => {
        this.agregarMarcador(
          bloqueo,
          iconoBloqueo,
          '🚧 Bloqueo',
          '#F26522'
        );
      });
    }

    if (eventos.robos) {
      eventos.robos.forEach((robo: any) => {
        this.agregarMarcador(
          robo,
          iconoRobo,
          '⚠️ Robo',
          '#9C27B0'
        );
      });
    }

    if (eventos.otros) {
      eventos.otros.forEach((otro: any) => {
        this.agregarMarcador(
          otro,
          iconoOtro,
          'ℹ️ Otro Evento',
          '#757575'
        );
      });
    }
  }

  private crearIconoPersonalizado(color: string): L.DivIcon {
    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        "></div>
      `,
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });
  }

  private agregarMarcador(
    evento: any,
    icono: L.DivIcon,
    tipoEvento: string,
    color: string
  ) {
    if (!evento.latitud || !evento.longitud || !this.map) return;

    const marker = L.marker([evento.latitud, evento.longitud], {
      icon: icono
    }).addTo(this.map);


    const popupContent = `
      <div style="min-width: 200px;">
        <h4 style="color: ${color}; margin: 0 0 10px 0;">${tipoEvento}</h4>
        <p style="margin: 5px 0;"><strong>Fecha:</strong> ${new Date(evento.fecha).toLocaleString('es-MX')}</p>
        <p style="margin: 5px 0;"><strong>Empresa ID:</strong> ${evento.idEmpresa}</p>
        <p style="margin: 5px 0;"><strong>Ubicación:</strong> ${evento.latitud.toFixed(6)}, ${evento.longitud.toFixed(6)}</p>
        ${evento.evidencia ? `<p style="margin: 5px 0;"><strong>Evidencia:</strong>  <a href="${evento.evidencia}" target="_blank" style="color: blue; text-decoration: underline;">
      Ver imagen
    </a> </p>` : ''}
      </div>
    `;

    marker.bindPopup(popupContent);

  }
}
