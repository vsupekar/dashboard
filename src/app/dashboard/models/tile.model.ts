export interface Tile {
  id: string;
  title: string;
  type: TileType;
  position: TilePosition;
  size: TileSize;
  data?: any;
  config?: TileConfig;
  externalComponent?: any;
}

export enum TileType {
  CHART = 'chart',
  METRIC = 'metric',
  TABLE = 'table',
  TEXT = 'text',
  CUSTOM = 'custom',
  EXTERNAL = 'external'
}

export interface TilePosition {
  x: number;
  y: number;
}

export interface TileSize {
  width: number;
  height: number;
}

export interface TileConfig {
  refreshInterval?: number;
  backgroundColor?: string;
  borderColor?: string;
  customSettings?: { [key: string]: any };
}

export interface TileData {
  value?: number;
  label?: string;
  chartData?: any;
  tableData?: any[];
  customData?: any;
}
