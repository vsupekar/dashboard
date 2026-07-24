import { Component, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentRef, OnInit, OnDestroy } from '@angular/core';

import { Tile, TileType } from '../../models/tile.model';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit, OnDestroy {
  @Input() tile!: Tile;
  @Input() isDraggable = true;
  @Output() edit = new EventEmitter<Tile>();
  @Output() delete = new EventEmitter<string>();
  @ViewChild('externalContainer', { read: ViewContainerRef }) externalContainer!: ViewContainerRef;

  TileType = TileType;
  private componentRef?: ComponentRef<any>;

  ngOnInit(): void {
    if (this.tile.type === TileType.EXTERNAL && this.tile.externalComponent) {
      setTimeout(() => this.loadExternalComponent(), 0);
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  loadExternalComponent(): void {
    if (this.externalContainer && this.tile.externalComponent) {
      this.externalContainer.clear();
      this.componentRef = this.externalContainer.createComponent(this.tile.externalComponent);
      if (this.tile.data) {
        Object.assign(this.componentRef.instance, this.tile.data);
      }
    }
  }

  onEdit(): void {
    this.edit.emit(this.tile);
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this tile?')) {
      this.delete.emit(this.tile.id);
    }
  }

  getBackgroundColor(): string {
    return this.tile.config?.backgroundColor || '#ffffff';
  }

  getBorderColor(): string {
    return this.tile.config?.borderColor || '#e0e0e0';
  }
}
