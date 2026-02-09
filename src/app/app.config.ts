import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { apiPrefixInterceptor } from './core/interceptors/api-prefix.interceptor';
import { TemperatureApiService } from './core/api/temperature-api.service';
import { TemperatureApiMockService } from './core/api/mockup/temperature-api-mock.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiPrefixInterceptor])),

    { provide: TemperatureApiService, useClass: TemperatureApiMockService },
  ],
};
