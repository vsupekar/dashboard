import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-external-custom-tile',
  standalone: true,
  imports: [],
  template: `
    <div class="external-tile">
      <div class="external-header">
        <span class="badge">External Component</span>
      </div>
      <div class="external-body">
        <h3>{{ title || 'Custom External Tile' }}</h3>
        <p>{{ message || 'This is an external custom component passed dynamically!' }}</p>
        <div class="stats">
          <div class="stat-item">
            <span class="stat-value">{{ value || 0 }}</span>
            <span class="stat-label">Custom Value</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .external-tile {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 10px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
    }

    .external-header {
      margin-bottom: 10px;
    }

    .badge {
      background: rgba(255, 255, 255, 0.2);
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .external-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .external-body h3 {
      margin: 0 0 10px 0;
      font-size: 1.3rem;
    }

    .external-body p {
      margin: 0 0 20px 0;
      opacity: 0.9;
    }

    .stats {
      display: flex;
      gap: 20px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  `]
})
export class ExternalCustomTileComponent {
  @Input() title?: string;
  @Input() message?: string;
  @Input() value?: number;
}
