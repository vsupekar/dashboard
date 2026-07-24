import { Component, Input, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Tile, TileType } from '../../models/tile.model';
import { TileComponent } from '../tile/tile.component';
import { TileModalComponent } from '../tile-modal/tile-modal.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { ButtonComponent } from '../../../common/button/button.component';
import { CardComponent } from '../../../common/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DragDropModule, TileComponent, TileModalComponent, ButtonComponent, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() enableDragDrop = true;
  @Input() enableLocalStorage = true;
  @Input() columns = 12;
  @Input() rowHeight = 100;
  @Input() gap = 10;
  @Input() externalTiles: Map<string, Type<any>> = new Map();

  tiles: Tile[] = [];
  isModalOpen = false;
  modalMode: 'create' | 'edit' = 'create';
  selectedTile: Tile | null = null;
  isLoading = false;

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: DashboardApiService
  ) {}

  ngOnInit(): void {
    this.loadTiles();
  }

  loadTiles(): void {
    this.isLoading = true;
    
    if (this.enableLocalStorage) {
      const savedTiles = this.localStorageService.loadTiles();
      if (savedTiles && savedTiles.length > 0) {
        this.tiles = savedTiles;
        this.applyExternalComponents();
        this.isLoading = false;
        return;
      }
    }

    this.apiService.getTiles().subscribe({
      next: (tiles) => {
        this.tiles = tiles;
        this.applyExternalComponents();
        if (this.enableLocalStorage) {
          this.localStorageService.saveTiles(this.tiles);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tiles:', error);
        this.tiles = this.getDefaultTiles();
        this.isLoading = false;
      }
    });
  }

  applyExternalComponents(): void {
    this.tiles.forEach(tile => {
      if (tile.type === TileType.EXTERNAL && tile.data?.componentKey) {
        const component = this.externalTiles.get(tile.data.componentKey);
        if (component) {
          tile.externalComponent = component;
        }
      }
    });
  }

  getDefaultTiles(): Tile[] {
    return [
      {
        id: '1',
        title: 'Total Users',
        type: TileType.METRIC,
        position: { x: 0, y: 0 },
        size: { width: 3, height: 2 },
        data: { value: 1234, label: 'Active Users' }
      },
      {
        id: '2',
        title: 'Revenue',
        type: TileType.METRIC,
        position: { x: 3, y: 0 },
        size: { width: 3, height: 2 },
        data: { value: 45678, label: 'Monthly Revenue' }
      },
      {
        id: '3',
        title: 'Performance Chart',
        type: TileType.CHART,
        position: { x: 6, y: 0 },
        size: { width: 6, height: 4 },
        data: { chartData: [] }
      }
    ];
  }

  openCreateModal(): void {
    this.modalMode = 'create';
    this.selectedTile = null;
    this.isModalOpen = true;
  }

  openEditModal(tile: Tile): void {
    this.modalMode = 'edit';
    this.selectedTile = tile;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedTile = null;
  }

  saveTile(tile: Tile): void {
    if (this.modalMode === 'create') {
      this.createTile(tile);
    } else {
      this.updateTile(tile);
    }
  }

  createTile(tile: Tile): void {
    this.apiService.createTile(tile).subscribe({
      next: (createdTile) => {
        this.tiles.push(createdTile);
        this.applyExternalComponents();
        this.saveTilesToStorage();
      },
      error: (error) => {
        console.error('Error creating tile:', error);
        this.tiles.push(tile);
        this.applyExternalComponents();
        this.saveTilesToStorage();
      }
    });
  }

  updateTile(tile: Tile): void {
    this.apiService.updateTile(tile).subscribe({
      next: (updatedTile) => {
        const index = this.tiles.findIndex(t => t.id === updatedTile.id);
        if (index !== -1) {
          this.tiles[index] = updatedTile;
          this.applyExternalComponents();
          this.saveTilesToStorage();
        }
      },
      error: (error) => {
        console.error('Error updating tile:', error);
        const index = this.tiles.findIndex(t => t.id === tile.id);
        if (index !== -1) {
          this.tiles[index] = tile;
          this.applyExternalComponents();
          this.saveTilesToStorage();
        }
      }
    });
  }

  deleteTile(tileId: string): void {
    this.apiService.deleteTile(tileId).subscribe({
      next: () => {
        this.tiles = this.tiles.filter(t => t.id !== tileId);
        this.saveTilesToStorage();
      },
      error: (error) => {
        console.error('Error deleting tile:', error);
        this.tiles = this.tiles.filter(t => t.id !== tileId);
        this.saveTilesToStorage();
      }
    });
  }

  onDrop(event: CdkDragDrop<Tile[]>): void {
    if (!this.enableDragDrop) return;

    const tile = this.tiles[event.previousIndex];
    if (tile) {
      this.tiles.splice(event.previousIndex, 1);
      this.tiles.splice(event.currentIndex, 0, tile);
      this.saveTilesToStorage();
    }
  }

  saveTilesToStorage(): void {
    if (this.enableLocalStorage) {
      this.localStorageService.saveTiles(this.tiles);
    }
  }

  clearDashboard(): void {
    if (confirm('Are you sure you want to clear all tiles?')) {
      this.tiles = [];
      this.localStorageService.clearAll();
    }
  }

  getTileGridStyle(tile: Tile): any {
    return {
      'grid-column': `span ${tile.size.width}`,
      'grid-row': `span ${tile.size.height}`,
      'min-height': `${this.rowHeight * tile.size.height + this.gap * (tile.size.height - 1)}px`
    };
  }
}
