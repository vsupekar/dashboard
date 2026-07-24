import { Injectable } from '@angular/core';
import { Tile } from '../models/tile.model';
import { DashboardConfig } from '../models/dashboard-config.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly TILES_KEY = 'dashboard_tiles';
  private readonly CONFIG_KEY = 'dashboard_config';

  saveTiles(tiles: Tile[]): void {
    localStorage.setItem(this.TILES_KEY, JSON.stringify(tiles));
  }

  loadTiles(): Tile[] | null {
    const data = localStorage.getItem(this.TILES_KEY);
    return data ? JSON.parse(data) : null;
  }

  saveConfig(config: DashboardConfig): void {
    localStorage.setItem(this.CONFIG_KEY, JSON.stringify(config));
  }

  loadConfig(): DashboardConfig | null {
    const data = localStorage.getItem(this.CONFIG_KEY);
    return data ? JSON.parse(data) : null;
  }

  clearAll(): void {
    localStorage.removeItem(this.TILES_KEY);
    localStorage.removeItem(this.CONFIG_KEY);
  }
}
