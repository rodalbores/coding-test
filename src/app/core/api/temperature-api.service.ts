import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardMetrics, ReadingPoint, Sensor } from './models';

@Injectable({ providedIn: 'root' })
export class TemperatureApiService {
  constructor(private http: HttpClient) {}

  getMetrics() {
    return this.http.get<DashboardMetrics>('/metrics');
  }

  listSensors() {
    return this.http.get<Sensor[]>('/sensors');
  }

  getLiveReadings(sensorId: string) {
    return this.http.get<ReadingPoint[]>(`/sensors/${sensorId}/readings/live`);
  }
}
