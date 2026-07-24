import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Tile } from '../models/tile.model';
import { ApiEndpoints } from '../models/dashboard-config.model';

export const API_ENDPOINTS = new InjectionToken<ApiEndpoints>('API_ENDPOINTS');

@Injectable()
export abstract class DashboardApiService {
  abstract getTiles(): Observable<Tile[]>;
  abstract createTile(tile: Tile): Observable<Tile>;
  abstract updateTile(tile: Tile): Observable<Tile>;
  abstract deleteTile(tileId: string): Observable<void>;
  abstract getTileData(tileId: string): Observable<any>;
}
