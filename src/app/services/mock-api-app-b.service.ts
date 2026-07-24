import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Tile, TileType } from '../dashboard/models/tile.model';
import { DashboardApiService } from '../dashboard/services/dashboard-api.service';

@Injectable({
  providedIn: 'root'
})
export class MockApiAppBService extends DashboardApiService {
  private tiles: Tile[] = [
    {
      id: 'app-b-1',
      title: 'App B - Revenue',
      type: TileType.METRIC,
      position: { x: 0, y: 0 },
      size: { width: 4, height: 2 },
      data: { value: 98765, label: 'Monthly Revenue' },
      config: { backgroundColor: '#fff3e0' }
    },
    {
      id: 'app-b-2',
      title: 'App B - Conversions',
      type: TileType.METRIC,
      position: { x: 4, y: 0 },
      size: { width: 4, height: 2 },
      data: { value: 3421, label: 'Conversions' },
      config: { backgroundColor: '#e8f5e9' }
    },
    {
      id: 'app-b-3',
      title: 'App B - Analytics',
      type: TileType.TABLE,
      position: { x: 8, y: 0 },
      size: { width: 4, height: 4 },
      data: { tableData: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }] }
    }
  ];

  getTiles(): Observable<Tile[]> {
    console.log('MockApiAppBService: Fetching tiles from App B endpoint');
    return of([...this.tiles]).pipe(delay(300));
  }

  createTile(tile: Tile): Observable<Tile> {
    console.log('MockApiAppBService: Creating tile in App B', tile);
    this.tiles.push(tile);
    return of(tile).pipe(delay(200));
  }

  updateTile(tile: Tile): Observable<Tile> {
    console.log('MockApiAppBService: Updating tile in App B', tile);
    const index = this.tiles.findIndex(t => t.id === tile.id);
    if (index !== -1) {
      this.tiles[index] = tile;
    }
    return of(tile).pipe(delay(200));
  }

  deleteTile(tileId: string): Observable<void> {
    console.log('MockApiAppBService: Deleting tile in App B', tileId);
    this.tiles = this.tiles.filter(t => t.id !== tileId);
    return of(undefined).pipe(delay(200));
  }

  getTileData(tileId: string): Observable<any> {
    console.log('MockApiAppBService: Fetching tile data from App B', tileId);
    return of({ message: 'Data from App B' }).pipe(delay(100));
  }
}
