import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ApiModule } from '../../client/api-mapa-riesgo/api.module';
import { Configuration } from '../../client/api-mapa-riesgo';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), importProvidersFrom(ApiModule.forRoot(() => new Configuration({ basePath: environment.mapaRiesgo })))],
};
