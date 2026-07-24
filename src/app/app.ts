import { Component, Type } from '@angular/core';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { ExternalCustomTileComponent } from './components/external-custom-tile.component';

@Component({
  selector: 'app-root',
  imports: [DashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  externalTiles: Map<string, Type<any>> = new Map([
    ['custom-external', ExternalCustomTileComponent]
  ]);
}
