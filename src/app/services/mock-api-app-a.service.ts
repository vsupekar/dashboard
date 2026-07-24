import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Tile, TileType } from '../dashboard/models/tile.model';
import { DashboardApiService } from '../dashboard/services/dashboard-api.service';

@Injectable({
  providedIn: 'root'
})
export class MockApiAppAService extends DashboardApiService {
  private tiles: Tile[] = [
    {
      id: 'app-a-1',
      title: 'App A - Total Sales',
      type: TileType.METRIC,
      position: { x: 0, y: 0 },
      size: { width: 3, height: 2 },
      data: { value: 5432, label: 'Total Sales' },
      config: { backgroundColor: '#e3f2fd' }
    },
    {
      id: 'app-a-2',
      title: 'App A - Active Users',
      type: TileType.METRIC,
      position: { x: 3, y: 0 },
      size: { width: 3, height: 2 },
      data: { value: 892, label: 'Active Users' },
      config: { backgroundColor: '#f3e5f5' }
    },
    {
      id: 'app-a-3',
      title: 'App A - Performance',
      type: TileType.CHART,
      position: { x: 6, y: 0 },
      size: { width: 6, height: 4 },
      data: { chartData: { type: 'line', values: [10, 20, 15, 30] } }
    }
  ];

  getTiles(): Observable<Tile[]> {
    console.log('MockApiAppAService: Fetching tiles from App A endpoint');
    return of([...this.tiles]).pipe(delay(300));
  }

  createTile(tile: Tile): Observable<Tile> {
    console.log('MockApiAppAService: Creating tile in App A', tile);
    this.tiles.push(tile);
    return of(tile).pipe(delay(200));
  }

  updateTile(tile: Tile): Observable<Tile> {
    console.log('MockApiAppAService: Updating tile in App A', tile);
    const index = this.tiles.findIndex(t => t.id === tile.id);
    if (index !== -1) {
      this.tiles[index] = tile;
    }
    return of(tile).pipe(delay(200));
  }

  deleteTile(tileId: string): Observable<void> {
    console.log('MockApiAppAService: Deleting tile in App A', tileId);
    this.tiles = this.tiles.filter(t => t.id !== tileId);
    return of(undefined).pipe(delay(200));
  }

  getTileData(tileId: string): Observable<any> {
    console.log('MockApiAppAService: Fetching tile data from App A', tileId);
    return of({ message: 'Data from App A' }).pipe(delay(100));
  }
}
