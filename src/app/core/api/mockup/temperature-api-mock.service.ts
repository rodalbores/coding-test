import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { DashboardMetrics, ReadingPoint, Sensor } from '../models';
import { MOCK_METRICS, MOCK_SENSORS, generateMockReadings, nextMockReading } from './mock-data';

/**
 * Mock implementation used for local UI development (no backend required).
 * Provided via DI in `app.config.ts` by overriding `TemperatureApiService`.
 */
@Injectable({ providedIn: 'root' })
export class TemperatureApiMockService {
  private readonly readingsCache = new Map<string, ReadingPoint[]>();

  getMetrics(): Observable<DashboardMetrics> {
    return of(MOCK_METRICS).pipe(delay(150));
  }

  listSensors(): Observable<Sensor[]> {
    return of(MOCK_SENSORS).pipe(delay(150));
  }

  getLiveReadings(sensorId: string): Observable<ReadingPoint[]> {
    if (!this.readingsCache.has(sensorId)) {
      this.readingsCache.set(sensorId, generateMockReadings(sensorId, 40));
    }

    const current = this.readingsCache.get(sensorId)!;
    const last = current[current.length - 1]?.tempC;
    const next = nextMockReading(sensorId, last);

    const updated = [...current.slice(-39), next]; // keep last 40 points
    this.readingsCache.set(sensorId, updated);

    return of(updated).pipe(delay(80));
  }
}
