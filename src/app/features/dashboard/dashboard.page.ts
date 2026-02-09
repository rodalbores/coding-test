import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TemperatureApiService } from '../../core/api/temperature-api.service';
import { StatCardsComponent } from './components/stat-cards.component';
import { SensorsTableComponent } from './components/sensors-table.component';
import { LiveReadingsComponent } from './components/live-readings.component';
import { Sensor } from '../../core/api/models';

@Component({
  standalone: true,
  imports: [CommonModule, StatCardsComponent, SensorsTableComponent, LiveReadingsComponent],
  templateUrl: './dashboard.page.html',
})
export class DashboardPage implements OnInit {
  private api = inject(TemperatureApiService);

  metrics = signal<{ activeSensors: number; messagesPerMinute: number } | null>(null);
  sensors = signal<Sensor[]>([]);
  selectedSensorId = signal<string | null>(null);
  hasError = signal(false);

  selectedSensor = computed(() => this.sensors().find((s) => s.id === this.selectedSensorId()) ?? this.sensors()[0] ?? null);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.hasError.set(false);

    this.api.getMetrics().subscribe({
      next: (v) => this.metrics.set(v),
      error: () => {
        this.metrics.set(null);
        this.hasError.set(true);
      },
    });

    this.api.listSensors().subscribe({
      next: (v) => {
        this.sensors.set(v);
        this.selectedSensorId.set(v[0]?.id ?? null);
      },
      error: () => {
        this.sensors.set([]);
        this.selectedSensorId.set(null);
        this.hasError.set(true);
      },
    });
  }

  refreshPage() {
    window.location.reload();
  }

  onSelectSensor(id: string) {
    this.selectedSensorId.set(id);
  }
}

