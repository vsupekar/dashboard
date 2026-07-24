import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { DashboardApiService } from './dashboard/services/dashboard-api.service';
import { MockApiAppAService } from './services/mock-api-app-a.service';
import { API_ENDPOINTS } from './dashboard/services/dashboard-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: DashboardApiService, useClass: MockApiAppAService },
    { 
      provide: API_ENDPOINTS, 
      useValue: {
        getTiles: '/api/app-a/tiles',
        createTile: '/api/app-a/tiles',
        updateTile: '/api/app-a/tiles',
        deleteTile: '/api/app-a/tiles',
        getTileData: '/api/app-a/tile-data'
      }
    }
  ]
};
