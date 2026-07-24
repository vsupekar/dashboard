# Angular 20 Reusable Dashboard

A fully reusable, configurable dashboard component for Angular 20 with CRUD operations, drag-and-drop functionality, and support for external custom components.

## Features

- ✅ **Reusable Dashboard Component** - Import and use in any Angular application
- ✅ **Configurable API Endpoints** - Use dependency injection to configure different API endpoints per application
- ✅ **Complete CRUD Operations** - Create, Read, Update, and Delete tiles with modal dialogs
- ✅ **Drag-and-Drop** - Reorder tiles with Angular CDK drag-drop
- ✅ **External Components** - Pass custom tile components dynamically
- ✅ **Local Storage** - Persist dashboard state automatically
- ✅ **Multiple Tile Types** - Metric, Chart, Table, Text, Custom, and External
- ✅ **Responsive Grid Layout** - Configurable columns and row height
- ✅ **TypeScript** - Full type safety

## Installation

```bash
npm install @angular/cdk
```

## Quick Start

### 1. Start the Development Server

```bash
npm start
```

Access the dashboard at `http://localhost:5000`

### 2. Configure API Endpoints

In your `app.config.ts`, provide your API endpoints and service implementation:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { DashboardApiService } from './dashboard/services/dashboard-api.service';
import { MockApiAppAService } from './services/mock-api-app-a.service';
import { API_ENDPOINTS } from './dashboard/services/dashboard-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: DashboardApiService, useClass: MockApiAppAService },
    { 
      provide: API_ENDPOINTS, 
      useValue: {
        getTiles: '/api/your-app/tiles',
        createTile: '/api/your-app/tiles',
        updateTile: '/api/your-app/tiles',
        deleteTile: '/api/your-app/tiles',
        getTileData: '/api/your-app/tile-data'
      }
    }
  ]
};
```

### 3. Use Dashboard Component

```typescript
import { Component, Type } from '@angular/core';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { ExternalCustomTileComponent } from './components/external-custom-tile.component';

@Component({
  selector: 'app-root',
  imports: [DashboardComponent],
  template: `<app-dashboard [externalTiles]="externalTiles"></app-dashboard>`
})
export class App {
  externalTiles: Map<string, Type<any>> = new Map([
    ['custom-external', ExternalCustomTileComponent]
  ]);
}
```

## API Customization - Key Feature

This dashboard is designed to be reusable across different applications with different API endpoints. Simply configure the endpoints using dependency injection:

### Application A (E-commerce Dashboard)

```typescript
// app-a/app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: DashboardApiService, useClass: AppAApiService },
    { 
      provide: API_ENDPOINTS, 
      useValue: {
        getTiles: 'https://ecommerce-api.com/api/tiles',
        createTile: 'https://ecommerce-api.com/api/tiles',
        updateTile: 'https://ecommerce-api.com/api/tiles',
        deleteTile: 'https://ecommerce-api.com/api/tiles',
        getTileData: 'https://ecommerce-api.com/api/tile-data'
      }
    }
  ]
};
```

### Application B (Analytics Dashboard)

```typescript
// app-b/app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: DashboardApiService, useClass: AppBApiService },
    { 
      provide: API_ENDPOINTS, 
      useValue: {
        getTiles: 'https://analytics-api.com/api/widgets',
        createTile: 'https://analytics-api.com/api/widgets',
        updateTile: 'https://analytics-api.com/api/widgets',
        deleteTile: 'https://analytics-api.com/api/widgets',
        getTileData: 'https://analytics-api.com/api/widget-data'
      }
    }
  ]
};
```

## External Tile Components

### Creating an External Component

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-tile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="custom-tile">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
    </div>
  `
})
export class CustomTileComponent {
  @Input() title?: string;
  @Input() message?: string;
}
```

### Registering External Components

```typescript
externalTiles: Map<string, Type<any>> = new Map([
  ['custom-tile', CustomTileComponent],
  ['analytics-widget', AnalyticsWidgetComponent]
]);
```

### Using External Tiles

When creating a tile with type `EXTERNAL`, add the component key to the tile data:

```typescript
{
  id: 'ext-1',
  title: 'Custom Component',
  type: TileType.EXTERNAL,
  position: { x: 0, y: 0 },
  size: { width: 4, height: 3 },
  data: {
    componentKey: 'custom-tile',
    title: 'My Title',
    message: 'My Message'
  }
}
```

## Dashboard Configuration

```typescript
<app-dashboard
  [enableDragDrop]="true"
  [enableLocalStorage]="true"
  [columns]="12"
  [rowHeight]="100"
  [gap]="10"
  [externalTiles]="externalTiles">
</app-dashboard>
```

### Configuration Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableDragDrop` | boolean | `true` | Enable drag-and-drop tile reordering |
| `enableLocalStorage` | boolean | `true` | Persist dashboard state to localStorage |
| `columns` | number | `12` | Number of grid columns |
| `rowHeight` | number | `100` | Height in pixels for each grid row |
| `gap` | number | `10` | Gap in pixels between tiles |
| `externalTiles` | Map | `new Map()` | Map of external component types |

## Tile Types

### Metric Tile
```typescript
{
  type: TileType.METRIC,
  data: { value: 1234, label: 'Total Users' }
}
```

### Chart Tile
```typescript
{
  type: TileType.CHART,
  data: { chartData: [...] }
}
```

### Table Tile
```typescript
{
  type: TileType.TABLE,
  data: { tableData: [...] }
}
```

### Text Tile
```typescript
{
  type: TileType.TEXT,
  data: { text: 'Your text content' }
}
```

### External Tile
```typescript
{
  type: TileType.EXTERNAL,
  data: { 
    componentKey: 'custom-external',
    title: 'Custom Data',
    value: 100
  }
}
```

## Implementing Custom API Service

Extend `DashboardApiService` to implement your own API integration:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardApiService } from './dashboard/services/dashboard-api.service';
import { Tile } from './dashboard/models/tile.model';

@Injectable()
export class MyCustomApiService extends DashboardApiService {
  constructor(private http: HttpClient) {
    super();
  }

  getTiles(): Observable<Tile[]> {
    return this.http.get<Tile[]>('/my-api/tiles');
  }

  createTile(tile: Tile): Observable<Tile> {
    return this.http.post<Tile>('/my-api/tiles', tile);
  }

  updateTile(tile: Tile): Observable<Tile> {
    return this.http.put<Tile>(`/my-api/tiles/${tile.id}`, tile);
  }

  deleteTile(tileId: string): Observable<void> {
    return this.http.delete<void>(`/my-api/tiles/${tileId}`);
  }

  getTileData(tileId: string): Observable<any> {
    return this.http.get(`/my-api/tiles/${tileId}/data`);
  }
}
```

## Project Structure

```
src/app/
├── dashboard/                    # Reusable dashboard module
│   ├── components/
│   │   ├── dashboard/           # Main dashboard component
│   │   ├── tile/                # Individual tile component
│   │   └── tile-modal/          # CRUD modal component
│   ├── models/                  # TypeScript interfaces
│   │   ├── tile.model.ts
│   │   └── dashboard-config.model.ts
│   └── services/
│       ├── dashboard-api.service.ts    # Abstract API service
│       ├── tile.service.ts             # Tile service implementation
│       └── local-storage.service.ts    # Persistence service
├── services/                    # Demo API implementations
│   ├── mock-api-app-a.service.ts
│   └── mock-api-app-b.service.ts
└── components/
    └── external-custom-tile.component.ts
```

## Usage in Different Applications

### Example: Copy Dashboard to Another Project

1. Copy the `dashboard/` folder to your project
2. Install dependencies: `npm install @angular/cdk`
3. Configure your API endpoints in `app.config.ts`
4. Import and use `DashboardComponent`

That's it! The dashboard is completely self-contained and reusable.

## CRUD Operations

- **Create Tile**: Click "Add Tile" button
- **Edit Tile**: Click the edit icon (✏️) on any tile
- **Delete Tile**: Click the delete icon (🗑️) on any tile
- **Drag & Drop**: Click and drag tiles to reorder

## Demo

The current implementation includes:
- **Mock API Service for App A** - Demonstrates e-commerce dashboard configuration
- **Mock API Service for App B** - Demonstrates analytics dashboard configuration
- **External Custom Tile** - Shows how to pass custom components dynamically

Switch between App A and App B by changing the provider in `app.config.ts`.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Access at http://localhost:5000
```

## Key Architectural Decisions

1. **Dependency Injection**: API endpoints are configurable through Angular's DI system
2. **Standalone Components**: Uses Angular 20's standalone component architecture
3. **Type Safety**: Full TypeScript support with interfaces and types
4. **Separation of Concerns**: Dashboard logic is decoupled from API implementation
5. **Local Storage Fallback**: Works without a backend for demo purposes

## License

MIT
