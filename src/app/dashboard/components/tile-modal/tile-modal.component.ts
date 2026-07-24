import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Tile, TileType } from '../../models/tile.model';

@Component({
  selector: 'app-tile-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tile-modal.component.html',
  styleUrls: ['./tile-modal.component.css']
})
export class TileModalComponent {
  @Input() isOpen = false;
  @Input() tile: Tile | null = null;
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() save = new EventEmitter<Tile>();
  @Output() close = new EventEmitter<void>();

  tileTypes = Object.values(TileType);
  
  formData: Partial<Tile> = {
    title: '',
    type: TileType.METRIC,
    position: { x: 0, y: 0 },
    size: { width: 2, height: 2 }
  };

  ngOnChanges(): void {
    if (this.tile && this.mode === 'edit') {
      this.formData = { ...this.tile };
    } else if (this.mode === 'create') {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.formData = {
      title: '',
      type: TileType.METRIC,
      position: { x: 0, y: 0 },
      size: { width: 2, height: 2 }
    };
  }

  onSave(): void {
    const tileData: Tile = {
      id: this.mode === 'edit' && this.tile ? this.tile.id : this.generateId(),
      title: this.formData.title || '',
      type: this.formData.type || TileType.METRIC,
      position: this.formData.position || { x: 0, y: 0 },
      size: this.formData.size || { width: 2, height: 2 },
      data: this.formData.data,
      config: this.formData.config,
      externalComponent: this.formData.externalComponent
    };
    this.save.emit(tileData);
    this.onClose();
  }

  onClose(): void {
    this.resetForm();
    this.close.emit();
  }

  private generateId(): string {
    return 'tile_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
