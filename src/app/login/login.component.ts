import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../client/api-mapa-riesgo';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm:FormGroup;
  fb = inject(FormBuilder);
  authentication = inject(AuthenticationService);
  router: Router = inject(Router);


  constructor() {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });

  }





  onSubmit(formValue: any) {

    console.log("Login form submitted with values:", formValue);

    const authenticated = this.authentication.apiAuthenticationAuthenticatePost(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (response) => {
        console.log("Authenticated successfully:", response);
        if (response.data?.token) {
          this.authentication.configuration.accessToken = response.data.token; // Guarda el token en el servicio de autenticación
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['mapa']);
        }
      },
      error: (error) => {
        console.error("Authentication failed:", error);
      }
    });
  }



}
