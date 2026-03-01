import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiModule } from '../../client/api-mapa-riesgo/api.module';
import { Configuration } from '../../client/api-mapa-riesgo';
import { environment } from '../environments/environment';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      ApiModule.forRoot(
        () => new Configuration({ basePath: environment.mapaRiesgo }),
      ),
    ),
  ],
};
