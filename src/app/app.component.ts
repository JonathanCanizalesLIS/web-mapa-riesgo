import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  AuthenticationService } from '../../client/api-mapa-riesgo';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent],
 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mapa-riesgo-frontend';





}
