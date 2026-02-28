import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MapaComponent } from './mapa/mapa.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Iniciar sesión' },
  { path: 'login', component: LoginComponent, title: 'Iniciar sesión' },
  { path: 'mapa', component: MapaComponent, title: 'Mapa de Riesgo' },
  { path: '**', redirectTo: '' } // Wildcard route for 404 pages
];
