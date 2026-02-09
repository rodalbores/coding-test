import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { KpiCardComponent } from '../../../ui/kpi/kpi-card.component';

@Component({
  selector: 'app-stat-cards',
  standalone: true,
  imports: [CommonModule, KpiCardComponent],
  template: `
    <div class="grid gap-4 sm:grid-cols-2">
      <app-kpi-card label="Active sensors" [value]="metrics?.activeSensors ?? null"></app-kpi-card>
      <app-kpi-card label="Messages per minute" [value]="metrics?.messagesPerMinute ?? null"></app-kpi-card>
    </div>
  `,
})
export class StatCardsComponent {
  @Input() metrics: { activeSensors: number; messagesPerMinute: number } | null = null;
}
