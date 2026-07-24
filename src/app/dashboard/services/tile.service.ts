import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Tile } from '../models/tile.model';
import { DashboardApiService, API_ENDPOINTS } from './dashboard-api.service';
import { ApiEndpoints } from '../models/dashboard-config.model';

@Injectable({
  providedIn: 'root'
})
export class TileService extends DashboardApiService {
  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINTS) private apiEndpoints: ApiEndpoints
  ) {
    super();
  }

  getTiles(): Observable<Tile[]> {
    return this.http.get<Tile[]>(this.apiEndpoints.getTiles);
  }

  createTile(tile: Tile): Observable<Tile> {
    return this.http.post<Tile>(this.apiEndpoints.createTile, tile);
  }

  updateTile(tile: Tile): Observable<Tile> {
    return this.http.put<Tile>(`${this.apiEndpoints.updateTile}/${tile.id}`, tile);
  }

  deleteTile(tileId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiEndpoints.deleteTile}/${tileId}`);
  }

  getTileData(tileId: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndpoints.getTileData}/${tileId}`);
  }
}
