import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Input, OnChanges, Output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, Subscription, switchMap } from 'rxjs';
import { TemperatureApiService } from '../../../core/api/temperature-api.service';
import { Sensor, ReadingPoint } from '../../../core/api/models';
import { TemperatureLineChartComponent } from './temperature-line-chart.component';

@Component({
  selector: 'app-live-readings',
  standalone: true,
  imports: [CommonModule, TemperatureLineChartComponent],
  template: `
    @if (!sensors || sensors.length === 0) {
      <div class="text-sm text-slate-500">No sensors available…</div>
    }

    @if (sensors && sensors.length > 0) {
    <div class="space-y-4">
      <div class="flex items-center justify-between gap-3">
        <div class="flex-1">
          <select
            id="sensor-select"
            [value]="sensor?.id || ''"
            (change)="onSensorChange($event)"
            class="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="" disabled>Select Sensor ID</option>
            @for (s of sensors; track s.id) {
              <option [value]="s.id">{{ s.name }}</option>
            }
          </select>
        </div>
        <div class="text-xs text-slate-500">Auto-refresh</div>
      </div>

      @if (hasError()) {
        <!-- Error message for live readings -->
        <div class="rounded-lg border border-red-200 bg-red-50 p-3 shadow-sm ring-1 ring-red-200">
          <p class="text-sm text-red-700">
            Error loading live readings. Please refresh the page to try again.
          </p>
        </div>
      }

      <app-temperature-line-chart [data]="data()"></app-temperature-line-chart>

      <div class="space-y-2">
        <h3 class="text-xs font-medium uppercase tracking-wide text-slate-400">Recent data packets</h3>

        @if (recentPackets().length === 0) {
          <div class="text-xs text-slate-400">No data yet…</div>
        }

        <div class="space-y-1">
          @for (packet of recentPackets(); track packet.id) {
            <div class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span class="font-medium text-slate-700">Packet #{{ packet.id }}</span>
                <span class="text-slate-400">{{ packet.time }}</span>
              </div>
              <span class="font-semibold text-blue-600">{{ packet.tempC.toFixed(1) }}°C</span>
            </div>
          }
        </div>

      </div>
    </div>
    }
  `,
})
export class LiveReadingsComponent implements OnChanges {
  private readonly api = inject(TemperatureApiService);
  private readonly destroyRef = inject(DestroyRef);
  private pollSub: Subscription | null = null;

  @Input() sensors: Sensor[] = [];
  @Input() sensor: Sensor | null = null;
  @Output() sensorChange = new EventEmitter<string>();

  data = signal<ReadingPoint[]>([]);
  recentPackets = signal<{ id: number; time: string; tempC: number }[]>([]);
  hasError = signal(false);

  onSensorChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const sensorId = selectElement.value;
    if (sensorId) {
      this.sensorChange.emit(sensorId);
    }
  }

  ngOnChanges() {
    if (!this.sensor) {
      this.data.set([]);
      this.recentPackets.set([]);
      this.pollSub?.unsubscribe();
      this.pollSub = null;
      return;
    }

    // Reset when sensor changes
    this.data.set([]);
    this.recentPackets.set([]);
    this.pollSub?.unsubscribe();

    // Simple polling. For real-time: swap to WebSocket/SSE later.
    this.pollSub = interval(2000)
      .pipe(
        switchMap(() => this.api.getLiveReadings(this.sensor!.id)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (points: ReadingPoint[]) => {
          this.hasError.set(false);
          this.data.set(points);

          const last5 = points.slice(-5);
          const base = Math.max(0, points.length - last5.length);
          const packets = last5
            .map((p, idx) => ({
              id: 1025 + base + idx,
              time: new Date(p.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              tempC: p.tempC,
            }))
            .reverse();
          this.recentPackets.set(packets);
        },
        error: () => {
          this.hasError.set(true);
          this.data.set([]);
          this.recentPackets.set([]);
        },
      });
  }
}
