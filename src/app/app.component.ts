import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiModule, AuthenticationService, Configuration } from '../../client/api-mapa-riesgo';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mapa-riesgo-frontend';

  authentication = inject(AuthenticationService);

  authenticated = this.authentication.apiAuthenticationAuthenticatePost("test", "password").subscribe({
    next: (response) => {
      console.log("Authenticated successfully:", response);
    },
    error: (error) => {
      console.error("Authentication failed:", error);
    }
  })

  

}
