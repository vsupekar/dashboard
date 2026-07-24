export interface DashboardConfig {
  id: string;
  name: string;
  tiles: any[];
  settings: DashboardSettings;
}

export interface DashboardSettings {
  columns: number;
  rowHeight: number;
  gap: number;
  allowDragDrop: boolean;
  allowResize: boolean;
}

export interface ApiEndpoints {
  getTiles: string;
  createTile: string;
  updateTile: string;
  deleteTile: string;
  getTileData: string;
}
